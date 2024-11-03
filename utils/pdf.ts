import PDFDocument from 'pdfkit'
import fs from 'fs'

interface ReportData {
  totalDistance: number
  totalTime: number
  totalCost: number
  totalEmissions: number
}

function exportReportToPDF(report: ReportData, orderId: number) {
  const doc = new PDFDocument()
  doc.pipe(fs.createWriteStream(`order_report_${orderId}.pdf`))

  doc
    .fontSize(20)
    .text('Отчет о заказе', { align: 'center' })
    .moveDown()
    .fontSize(12)
    .text(`Идентификатор заказа: ${orderId}`)
    .moveDown()
    .text(`Общее расстояние: ${report.totalDistance} км`)
    .text(`Общее время: ${report.totalTime} часов`)
    .text(`Общие затраты: $${report.totalCost}`)
    .text(`Общие выбросы CO₂: ${report.totalEmissions} кг`)
    .end()
}
