import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { existsSync } from "node:fs";
import { writeFile, unlink } from "node:fs/promises";
import { spa } from "../src/data/site";

test("complete page, valid navigation, local assets and WhatsApp links", async ({
  page,
}) => {
  const errors: string[] = [];
  const remoteRequests: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("request", (request) => {
    if (
      !request.url().startsWith("http://127.0.0.1:5198") &&
      !request.url().startsWith("data:")
    )
      remoteRequests.push(request.url());
  });
  await page.goto("/");
  await expect(page).toHaveTitle("Savia Spa | Wellness & Beauty en Mazatlán");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("main section")).toHaveCount(10);
  for (const link of await page.locator('a[href^="#"]').all()) {
    const href = await link.getAttribute("href");
    await expect(page.locator(href!)).toHaveCount(1);
  }
  const whatsappLinks = await page.locator('a[href^="https://wa.me/"]').all();
  expect(whatsappLinks.length).toBeGreaterThanOrEqual(9);
  for (const link of whatsappLinks) {
    const url = new URL((await link.getAttribute("href"))!);
    expect(url.pathname).toBe(`/${spa.whatsapp}`);
    expect(url.searchParams.get("text")).toContain(spa.whatsappMessage);
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  }
  for (const image of await page.locator("main img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        image.evaluate((img) => (img as HTMLImageElement).naturalWidth),
      )
      .toBeGreaterThan(0);
    await expect(image).toHaveAttribute("src", /^\/images\//);
  }
  expect(errors).toEqual([]);
  expect(remoteRequests).toEqual([]);
});

for (const width of [320, 375, 390, 430, 768, 1024, 1280, 1440, 1920]) {
  test(`responsive layout at ${width}px with no horizontal overflow`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    for (const section of await page.locator("main section, footer").all()) {
      await section.scrollIntoViewIfNeeded();
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(overflow).toBeLessThanOrEqual(1);
    }
    if ([375, 768, 1440].includes(width)) {
      await page.evaluate(() => window.scrollTo(0, 0));
      await expect(page.locator(".site-header")).not.toHaveClass(/is-scrolled/);
      await page.screenshot({
        path: testInfo.outputPath(`savia-hero-${width}.png`),
      });
      await page.screenshot({
        path: testInfo.outputPath(`savia-${width}.png`),
        fullPage: true,
      });
    }
  });
}

test("mobile menu traps focus, supports Escape and closes on navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Abrir menú" });
  const menu = page.getByRole("dialog", { name: "Un momento para ti" });
  await toggle.click();
  await expect(menu).toBeVisible();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  expect(await page.evaluate(() => document.body.style.overflow)).toBe(
    "hidden",
  );
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press("Tab");
    expect(
      await page.evaluate(() => document.activeElement?.closest("dialog")?.id),
    ).toBe("mobile-menu");
  }
  await page.keyboard.press("Escape");
  await expect(menu).not.toBeVisible();
  await expect(toggle).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe(
    "hidden",
  );
  await toggle.click();
  await menu.getByRole("link", { name: "Experiencias" }).click();
  await expect(menu).not.toBeVisible();
  await expect(page).toHaveURL(/#experiencias$/);
  await expect(
    page.getByRole("link", {
      name: "Reservar por WhatsApp (abre una pestaña nueva)",
    }),
  ).toBeVisible();
  await toggle.click();
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(menu).not.toBeVisible();
});

test("keyboard entry, legal information and reduced motion", async ({
  page,
}) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Saltar al contenido" }),
  ).toBeFocused();
  expect(
    await page
      .locator("h1")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  expect(
    await page
      .locator("html")
      .evaluate((el) => getComputedStyle(el).scrollBehavior),
  ).toBe("auto");
  const privacy = page.getByRole("button", { name: "Aviso de privacidad" });
  await privacy.click();
  await expect(
    page.getByRole("dialog", { name: "Aviso de privacidad" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Entendido" }).click();
  await expect(privacy).toBeFocused();
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  const legalBounds = await page
    .getByRole("button", { name: "Términos", exact: true })
    .boundingBox();
  const floatingBounds = await page.locator(".floating-whatsapp").boundingBox();
  expect(legalBounds!.y + legalBounds!.height).toBeLessThan(floatingBounds!.y);
});

test("desktop and mobile accessibility including open menu", async ({
  page,
}) => {
  await page.goto("/");
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  }
  await page.getByRole("button", { name: "Abrir menú" }).click();
  const menuResults = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(menuResults.violations).toEqual([]);
});

test("scroll reveals work with normal motion and react to reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const section = page.locator(".about-copy");
  await expect(section).toHaveAttribute("data-reveal", "pending");
  await section.scrollIntoViewIfNeeded();
  await expect(section).toHaveAttribute("data-reveal", "visible");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator('[data-reveal="pending"]')).toHaveCount(0);
});

test("adding a local WebP replaces the fallback automatically; broken files recover", async ({
  page,
}) => {
  const fixture = "public/images/spa-hero.webp";
  test.skip(
    existsSync(fixture),
    "Preserve the real photograph when one has been added.",
  );
  await page.goto("/");
  const hero = page.locator(".hero-image-frame img");
  await expect(hero).toHaveAttribute("data-fallback", "true");
  const imageData = await page.evaluate(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 4;
    canvas.height = 4;
    return canvas.toDataURL("image/webp").split(",")[1];
  });
  try {
    await writeFile(fixture, Buffer.from(imageData, "base64"));
    await expect(hero).toHaveAttribute("src", "/images/spa-hero.webp", {
      timeout: 10000,
    });
    await expect
      .poll(() =>
        hero.evaluate((img) => (img as HTMLImageElement).naturalWidth),
      )
      .toBe(4);
    await page.route("**/images/spa-hero.webp", (route) =>
      route.fulfill({
        status: 200,
        contentType: "image/webp",
        body: "invalid image fixture",
      }),
    );
    await page.reload();
    await expect(hero).toHaveAttribute("data-fallback", "true");
    await expect
      .poll(() =>
        hero.evaluate((img) => (img as HTMLImageElement).naturalWidth),
      )
      .toBeGreaterThan(4);
  } finally {
    await unlink(fixture);
  }
  await expect(hero).toHaveAttribute(
    "src",
    "/images/placeholders/spa-hero.svg",
  );
});
