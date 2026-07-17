const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.post.createMany({
    data: [
      {
        title: "Pendidikan di SMP Negeri 2024: Menengok Masa Depan Pendidikan di Indonesia yang Semakin Gemilang",
        content: "Pendidikan di usia remaja adalah titik krusial bagi perkembangan anak. SMP (Sekolah Menengah Pertama) memainkan peran penting dalam menata masa depan anak yang lebih baik. Di SMPN 3 Cibungbulang, pendekatan baru yang lebih interaktif dan menyenangkan terus dikembangkan.",
        published: true,
      },
      {
        title: "Upacara Hari Pahlawan 10 November 2024, di Halaman SMP Negeri 3 Cibungbulang Berlangsung Khidmat",
        content: "Tepat pada 10 November 2024, seluruh warga sekolah di SMP Negeri 3 Cibungbulang merayakan Hari Pahlawan dengan hikmat. Acara dimulai dengan pengibaran bendera dan dilanjutkan dengan pembacaan pesan-pesan pahlawan nasional untuk menumbuhkan rasa nasionalisme.",
        published: true,
      }
    ]
  });
  console.log('Dummy posts seeded successfully.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
