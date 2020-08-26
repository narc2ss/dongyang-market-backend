export default function generateCode() {
  return new Promise((resolve, reject) => {
    let result = Math.floor(Math.random() * 1000000) + 100000;
    if (result > 1000000) {
      result -= 100000;
    }
    resolve(result);
  });
}
