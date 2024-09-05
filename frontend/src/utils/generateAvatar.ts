export default function generateAvatarByName(name) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = 60;
  canvas.height = 60;

  const colors = [
    "#f1947d",
    "#8bf19c",
    "#7588e5",
    "#ee8ac2",
    "#b779e8",
    "#6ae8df",
    "#eff67d",
  ];

  const nameHash = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const colorIndex = Math.floor(Math.random() * (colors.length - 0) + 0);

  ctx.fillStyle = colors[colorIndex];
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Добавляем первую букву имени в центр изображения
  ctx.font = "30px Roboto, sans-serif";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText(name[0].toUpperCase(), canvas.width / 2, canvas.height / 2 + 10);

  return canvas.toDataURL();
}
