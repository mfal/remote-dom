import { expect, test } from '@playwright/test';

[
  ['iframe', 'react-mutations'],
].forEach(([sandbox, example]) => {
  test(`mutations are applied correctly with ${sandbox} sandbox and ${example} example`, async ({
    page,
  }) => {
    await page.goto(`/?sandbox=${sandbox}&example=${example}`);

    await expect(page.getByText('Button 1')).toBeVisible();
    await expect(page.getByText('Button 2')).toBeVisible();
    await expect(page.getByText('Loading 1')).not.toBeVisible();
    await expect(page.getByText('Loading 2')).not.toBeVisible();
  });
});
