function esc(s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}

function tile(label, value, ltr) {
  return '<div class="tile"><div class="label">' + esc(label) + '</div>' +
    '<div class="value' + (ltr ? ' ltr' : '') + '">' + esc(value) + '</div></div>';
}

function render() {
  var id = (location.hash || "#1").slice(1);
  var v = VEHICLES[id];
  var app = document.getElementById("app");
  if (!v) {
    app.innerHTML = '<div class="notfound">لا توجد بيانات لهذه المركبة</div>';
    return;
  }
  var rows = v.drivers.map(function (d) {
    return "<tr><td>" + esc(d.name) + '</td><td class="num">' + esc(d.phone) + "</td></tr>";
  }).join("");

  app.innerHTML =
    '<div class="plate">' + esc(v.plate) + "</div>" +
    tile("المركز", v.center) +
    tile("صاحب المركبة", v.owner) +
    tile("تليفون صاحب المركبة", v.phone, true) +
    tile("التعريفة", v.fare) +
    "<h2>السائقون</h2>" +
    '<div class="table"><table><thead><tr><th>الاسم</th><th class="num">التليفون</th></tr></thead><tbody>' +
    rows + "</tbody></table></div>";
}

window.addEventListener("hashchange", render);
render();
