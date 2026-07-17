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
      },
      {
        title: "Gerakan Murid Menanam Pohon, Wujud Kepedulian Lingkungan di Hari Pertama Sekolah",
        content: "Gerakan Murid Menanam Pohon, Wujud Kepedulian Lingkungan di Hari Pertama Sekolah Bogor, 15 Juli 2026 - Dalam rangka menumbuhkan kepedulian terhadap kelestarian lingkungan dan bumi, SMP Negeri 3 Cibungbulang mengadakan acara penanaman bibit pohon bersama.",
        published: true,
      },
      {
        title: "MPLS Ramah Hari Kedua, SMP Negeri 3 Cibungbulang Bekali Peserta Didik Baru dengan Edukasi Kesehatan dan Penguatan Karakter",
        content: "MPLS Ramah Hari Kedua, SMP Negeri 3 Cibungbulang Bekali Peserta Didik Baru dengan Edukasi Kesehatan dan Penguatan Karakter Bogor, 16 Juli 2026 - Kegiatan masa pengenalan lingkungan sekolah di hari kedua diisi dengan pemaparan materi kesehatan remaja dan anti-bullying.",
        published: true,
      },
      {
        title: "Persiapan Lomba Cerdas Cermat Tingkat Kabupaten Bogor Berjalan Lancar",
        content: "Dalam rangka menyambut perlombaan Cerdas Cermat tingkat Kabupaten Bogor, tim unggulan SMPN 3 Cibungbulang terus melakukan pemantapan materi bersama para guru pembimbing di perpustakaan sekolah. Lomba ini akan menguji pengetahuan siswa di bidang sains, sosial, dan matematika.",
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
