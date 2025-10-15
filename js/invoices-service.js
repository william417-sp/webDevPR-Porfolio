// Simulación de base de datos de facturas
let invoices = JSON.parse(localStorage.getItem('invoices')) || [];

// Función para crear una factura
function createInvoice(invoiceData) {
    const newInvoice = {
        id: Date.now().toString(),
        userId: invoiceData.userId,
        projectId: invoiceData.projectId,
        number: generateInvoiceNumber(),
        date: new Date().toISOString(),
        dueDate: invoiceData.dueDate,
        items: invoiceData.items.map(item => ({
            ...item,
            total: item.quantity * item.price
        })),
        subtotal: calculateSubtotal(invoiceData.items),
        tax: calculateTax(invoiceData.items),
        total: calculateTotal(invoiceData.items),
        status: 'pending', // pending, paid, overdue, cancelled
        paymentMethod: invoiceData.paymentMethod,
        notes: invoiceData.notes || '',
        paidAt: null
    };

    invoices.push(newInvoice);
    localStorage.setItem('invoices', JSON.stringify(invoices));

    // Notificar al usuario
    window.messagesService.createNotification({
        userId: invoiceData.userId,
        type: 'invoice_created',
        title: 'Nueva Factura',
        description: `Se ha generado la factura #${newInvoice.number}`,
        relatedId: newInvoice.id
    });

    return newInvoice;
}

// Función para obtener facturas de un usuario
function getUserInvoices(userId) {
    return invoices.filter(invoice => invoice.userId === userId)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Función para obtener facturas de un proyecto
function getProjectInvoices(projectId) {
    return invoices.filter(invoice => invoice.projectId === projectId)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Función para marcar factura como pagada
function markInvoiceAsPaid(invoiceId, paymentDetails) {
    const invoice = invoices.find(inv => inv.id === invoiceId);
    if (!invoice) throw new Error('Factura no encontrada');

    invoice.status = 'paid';
    invoice.paidAt = new Date().toISOString();
    invoice.paymentDetails = paymentDetails;

    localStorage.setItem('invoices', JSON.stringify(invoices));

    // Notificar al usuario
    window.messagesService.createNotification({
        userId: invoice.userId,
        type: 'invoice_paid',
        title: 'Factura Pagada',
        description: `La factura #${invoice.number} ha sido marcada como pagada`,
        relatedId: invoice.id
    });

    return invoice;
}

// Función para cancelar factura
function cancelInvoice(invoiceId, reason) {
    const invoice = invoices.find(inv => inv.id === invoiceId);
    if (!invoice) throw new Error('Factura no encontrada');

    invoice.status = 'cancelled';
    invoice.cancellationReason = reason;
    invoice.cancelledAt = new Date().toISOString();

    localStorage.setItem('invoices', JSON.stringify(invoices));

    // Notificar al usuario
    window.messagesService.createNotification({
        userId: invoice.userId,
        type: 'invoice_cancelled',
        title: 'Factura Cancelada',
        description: `La factura #${invoice.number} ha sido cancelada`,
        relatedId: invoice.id
    });

    return invoice;
}

// Función para obtener estadísticas de facturas
function getInvoiceStats(userId) {
    const userInvoices = getUserInvoices(userId);
    return {
        totalInvoices: userInvoices.length,
        totalAmount: userInvoices.reduce((acc, inv) => acc + inv.total, 0),
        byStatus: userInvoices.reduce((acc, inv) => {
            acc[inv.status] = (acc[inv.status] || 0) + 1;
            return acc;
        }, {}),
        totalPaid: userInvoices
            .filter(inv => inv.status === 'paid')
            .reduce((acc, inv) => acc + inv.total, 0),
        totalPending: userInvoices
            .filter(inv => inv.status === 'pending')
            .reduce((acc, inv) => acc + inv.total, 0)
    };
}

// Funciones auxiliares
function generateInvoiceNumber() {
    const prefix = 'INV';
    const year = new Date().getFullYear().toString().substr(-2);
    const sequence = (invoices.length + 1).toString().padStart(4, '0');
    return `${prefix}-${year}${sequence}`;
}

function calculateSubtotal(items) {
    return items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
}

function calculateTax(items) {
    const subtotal = calculateSubtotal(items);
    return subtotal * 0.07; // 7% IVU
}

function calculateTotal(items) {
    const subtotal = calculateSubtotal(items);
    const tax = calculateTax(items);
    return subtotal + tax;
}

// Exportar funciones
window.invoicesService = {
    createInvoice,
    getUserInvoices,
    getProjectInvoices,
    markInvoiceAsPaid,
    cancelInvoice,
    getInvoiceStats
};
