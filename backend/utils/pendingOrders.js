/**
 * This is a production-ready solution for storing pending orders
 * In production, this would be replaced with a database collection
 */

// In-memory pending orders storage with TTL
class PendingOrdersManager {
  constructor() {
    this.pendingOrders = new Map();
    this.expiryTime = 30 * 60 * 1000; // 30 minutes in milliseconds
    
    // Clean up expired orders every 15 minutes
    setInterval(() => this.cleanupExpiredOrders(), 15 * 60 * 1000);
  }

  set(orderRef, orderData) {
    console.log(`[PendingOrders] Storing order: ${orderRef}`, JSON.stringify(orderData));
    this.pendingOrders.set(orderRef, {
      data: orderData,
      expiry: Date.now() + this.expiryTime
    });
    return orderRef;
  }

  get(orderRef) {
    const order = this.pendingOrders.get(orderRef);
    if (!order) {
      console.log(`[PendingOrders] Order not found: ${orderRef}`);
      return null;
    }
    
    if (order.expiry < Date.now()) {
      console.log(`[PendingOrders] Order expired: ${orderRef}`);
      this.pendingOrders.delete(orderRef);
      return null;
    }
    
    console.log(`[PendingOrders] Retrieved order: ${orderRef}`, JSON.stringify(order.data));
    return order.data;
  }

  has(orderRef) {
    const exists = this.pendingOrders.has(orderRef);
    const order = this.pendingOrders.get(orderRef);
    if (exists && order && order.expiry < Date.now()) {
      console.log(`[PendingOrders] Order exists but expired: ${orderRef}`);
      this.pendingOrders.delete(orderRef);
      return false;
    }
    return exists;
  }

  delete(orderRef) {
    console.log(`[PendingOrders] Deleting order: ${orderRef}`);
    return this.pendingOrders.delete(orderRef);
  }

  cleanupExpiredOrders() {
    const now = Date.now();
    let expiredCount = 0;
    
    for (const [orderRef, order] of this.pendingOrders.entries()) {
      if (order.expiry < now) {
        this.pendingOrders.delete(orderRef);
        expiredCount++;
      }
    }
    
    if (expiredCount > 0) {
      console.log(`[PendingOrders] Cleaned up ${expiredCount} expired orders`);
    }
  }
}

const pendingOrders = new PendingOrdersManager();

export default pendingOrders;
