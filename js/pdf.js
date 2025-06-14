
function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  const nombre = document.getElementById("nombreCliente").value;
  const telefono = document.getElementById("telefonoCliente").value;
  const direccion = document.getElementById("direccionCliente").value;
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Fondo oliva
  doc.setFillColor(161, 154, 88);  // color de fondo estilo 'Quiénes somos'
  doc.rect(0, 0, 210, 297, "F");

  // Título
  doc.setFont("times", "bold");
  doc.setFontSize(30);
  doc.setTextColor(0, 0, 0);
  doc.text("Jeweler’s Store", 105, 25, { align: "center" });

  // Fecha
  const today = new Date();
  const fecha = today.toLocaleDateString();
  doc.setFontSize(10);
  doc.setFont("times", "normal");
  doc.text(`Fecha: ${fecha}`, 180, 30, { align: "right" });

  // Datos del cliente
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text("Datos del cliente", 105, 45, { align: "center" });
  doc.text(`Nombre: ${nombre}`, 105, 52, { align: "center" });
  doc.text(`Teléfono: ${telefono}`, 105, 59, { align: "center" });
  doc.text(`Dirección: ${direccion}`, 105, 66, { align: "center" });

  // Detalle del pedido
  doc.setFont("times", "bold");
  doc.setFontSize(14);
  doc.text("Detalle del pedido", 105, 82, { align: "center" });

  doc.setFont("times", "normal");
  doc.setFontSize(12);
  let y = 92;
  let total = 0;

  carrito.forEach((item, i) => {
    let subtotal = item.precio * item.cantidad;
    total += subtotal;
    doc.text(`${i + 1}. ${item.nombre} - ${item.cantidad} x $${item.precio} = $${subtotal.toFixed(2)}`, 105, y, { align: "center" });
    y += 8;
  });

  doc.setFont("times", "bold");
  doc.setFontSize(13);
  doc.text(`Total: $${total.toFixed(2)}`, 105, y + 10, { align: "center" });

  // Agradecimiento simple
  doc.setFont("times", "italic");
  doc.setFontSize(13);
  doc.text("Gracias por tu preferencia.", 105, y + 25, { align: "center" });

  doc.save("pedido_jeweler.pdf");
  localStorage.removeItem("carrito");
  setTimeout(() => location.reload(), 500);
}
