/**
 * 纯前端导出工具
 * 支持 CSV 和 JSON 格式导出
 */

export type ExportFormat = 'csv' | 'json' | 'excel'

interface ExportOptions {
  filename?: string
  format?: ExportFormat
}

/**
 * 将数据转换为CSV格式
 */
function convertToCSV(data: Record<string, any>[]): string {
  if (data.length === 0) return ''
  
  const headers = Object.keys(data[0])
  const csvRows: string[] = []
  
  // 添加UTF-8 BOM以支持中文
  csvRows.push('\uFEFF' + headers.join(','))
  
  for (const row of data) {
    const values = headers.map(header => {
      const value = row[header]
      // 处理包含逗号或换行符的值
      if (typeof value === 'string' && (value.includes(',') || value.includes('\n') || value.includes('"'))) {
        return `"${value.replace(/"/g, '""')}"`
      }
      return value ?? ''
    })
    csvRows.push(values.join(','))
  }
  
  return csvRows.join('\n')
}

/**
 * 触发文件下载
 */
function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * 导出数据为CSV
 */
export function exportToCSV(
  data: Record<string, any>[],
  options: ExportOptions = {}
): boolean {
  try {
    const { filename = `export_${Date.now()}.csv` } = options
    const csv = convertToCSV(data)
    downloadFile(csv, filename, 'text/csv;charset=utf-8;')
    return true
  } catch (error) {
    console.error('Export CSV failed:', error)
    return false
  }
}

/**
 * 导出数据为JSON
 */
export function exportToJSON(
  data: Record<string, any>[],
  options: ExportOptions = {}
): boolean {
  try {
    const { filename = `export_${Date.now()}.json` } = options
    const json = JSON.stringify(data, null, 2)
    downloadFile(json, filename, 'application/json')
    return true
  } catch (error) {
    console.error('Export JSON failed:', error)
    return false
  }
}

/**
 * 通用导出函数
 */
export function exportData(
  data: Record<string, any>[],
  options: ExportOptions = {}
): boolean {
  const { format = 'csv', filename } = options
  
  switch (format) {
    case 'csv':
      return exportToCSV(data, { filename: filename || `export_${Date.now()}.csv` })
    case 'json':
      return exportToJSON(data, { filename: filename || `export_${Date.now()}.json` })
    default:
      return exportToCSV(data, { filename: filename || `export_${Date.now()}.csv` })
  }
}

/**
 * 格式化导出数据 - 订单
 */
export function formatOrdersForExport(orders: any[]) {
  return orders.map(order => ({
    '订单号': order.id,
    '客户姓名': order.userName,
    '服务类型': order.type === 'hotel' ? '酒店' : order.type === 'guide' ? '导游' : '体验',
    '服务名称': order.title,
    '订单金额': `¥${order.amount}`,
    '平台费用': `¥${order.platformFee}`,
    '实际收入': `¥${order.netAmount}`,
    '订单状态': order.status === 'completed' ? '已完成' : 
                order.status === 'confirmed' ? '已确认' : 
                order.status === 'pending' ? '待处理' : 
                order.status === 'refunding' ? '退款中' : 
                order.status === 'refunded' ? '已退款' : '已取消',
    '下单日期': order.createdAt?.split('T')[0] || '-',
    '服务日期': order.serviceDate || '-',
    '完成日期': order.completedAt?.split('T')[0] || '-',
  }))
}

/**
 * 格式化导出数据 - 收入
 */
export function formatEarningsForExport(transactions: any[]) {
  return transactions.map(tx => ({
    '交易号': tx.id,
    '交易类型': tx.type === 'income' ? '收入' : 
                tx.type === 'withdrawal' ? '提现' : 
                tx.type === 'refund' ? '退款' : '其他',
    '金额': tx.amount > 0 ? `+¥${tx.amount}` : `-¥${Math.abs(tx.amount)}`,
    '描述': tx.description,
    '状态': tx.status === 'completed' ? '已完成' : 
            tx.status === 'pending' ? '处理中' : '失败',
    '日期': tx.createdAt?.split('T')[0] || '-',
  }))
}

/**
 * 格式化导出数据 - 评价
 */
export function formatReviewsForExport(reviews: any[]) {
  return reviews.map(review => ({
    '评价ID': review.id,
    '客户姓名': review.guestName,
    '国籍': review.nationality || review.flag,
    '评分': review.rating,
    '评价内容': review.content,
    '服务类型': review.serviceType || review.activity,
    '评价日期': review.date,
    '是否有回复': review.reply ? '是' : '否',
    '回复内容': review.reply || '-',
  }))
}
