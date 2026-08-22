async function main() {
  const res = await fetch('http://localhost:3000/tentang-kami/sumber-daya-manusia/baca/cc947b06-826e-47dd-8d1a-7ed04b95a69f');
  console.log('Status:', res.status);
  const text = await res.text();
  console.log('Response:', text.substring(0, 500));
}
main();
