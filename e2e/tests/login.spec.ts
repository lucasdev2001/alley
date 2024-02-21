import { test, expect } from "@playwright/test";

test("has inputs", async ({ page, context }) => {
  await page.goto("http://localhost:5173/");
  const emailInput = await page.getByTestId("email-input");
  const passwordInput = await page.getByTestId("password-input");
  const submitButton = await page.getByTestId("submit-button");

  await emailInput.fill("adm");
  await passwordInput.fill("adm");
  await submitButton.click();

  console.log(await emailInput.inputValue());
  console.log(await passwordInput.inputValue());
});
