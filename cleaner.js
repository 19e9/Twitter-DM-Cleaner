(async () => {
  const delay = ms => new Promise(res => setTimeout(res, ms));

  let count = 0;
  const limit = 50;

  while (count < limit) {
    console.log(`🔄 [${count + 1}] İşlem başlıyor...`);

    const menuPath = document.querySelector('svg path[d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"]');

    if (!menuPath) {
      console.log("❌ Üç nokta ikonu bulunamadı.");
      break;
    }

    const menuSvg = menuPath.closest('svg');
    const menuButton = menuSvg?.parentElement?.parentElement;
    if (!menuButton) {
      console.log("❌ Menü butonu bulunamadı.");
      break;
    }

    menuButton.click();
    console.log("✅ Menü açıldı.");
    await delay(500);

    const menuItems = Array.from(document.querySelectorAll('div[role="menuitem"]'));
    const leaveBtn = menuItems.find(el => el.innerText.trim() === "Leave" || el.innerText.trim() === "Konuşmadan ayrıl");
    const deleteBtn = menuItems.find(el => el.innerText.includes("Delete conversation") || el.innerText.includes("Sohbeti sil"));

    if (leaveBtn) {
      leaveBtn.click();
      console.log("🚪 Leave seçildi.");
    } else if (deleteBtn) {
      deleteBtn.click();
      console.log("🗑️ Delete seçildi.");
    } else {
      console.log("❌ Leave/Delete bulunamadı.");
      break;
    }

    await delay(500);

    const confirmBtn = document.querySelector('button[data-testid="confirmationSheetConfirm"]');
    if (confirmBtn) {
      confirmBtn.click();
      console.log(`✅ [${count + 1}] Onaylandı.`);
      count++;
    } else {
      console.log("❌ Onay butonu bulunamadı.");
      break;
    }

    await delay(1000);
  }

  console.log("🔁 50 işlem tamamlandı. Sayfa yenileniyor...");
  await delay(1000);
  location.reload();
})();
