const Ticket = require("../models/Ticket");

class MyDB {
  constructor() {
    this.tickets = [];
  }
  //==============================================//
  /**
   * Create a ticket
   * @param {string} username
   * @param {number} price
   * @returns {Ticket} return a ticket object
   */
  create(username, price) {
    const ticket = new Ticket(username, price);
    this.tickets.push(ticket);
    return ticket;
  }
  //==============================================//
  /**
   * create a multiple ticket for a single user
   * @param {string} username
   * @param {number} price
   * @param {number} quantity
   * @returns {Array <Ticket>}
   */
  bulkTicket(username, price, quantity) {
    const result = [];
    for (let i = 0; i < quantity; i++) {
      const ticket = this.create(username, price);
      result.push(ticket);
    }
    return result;
  }
  //======================================================//
  /**
   * return all tickets
   */

  find() {
    return this.tickets;
  }
  //==============================================//
  /**
   * find a single ticket by id
   * @param {string} ticketId
   * @returns {Ticket}
   */
  findById(ticketId) {
    const tickets = this.tickets.find(
      /**
       * @param {Ticket} ticket
       */

      (ticket) => ticket.id === ticketId
    );
    return tickets;
  }
  //============================================//
  /**
   *
   * @param {string;} username
   * @returns {Array <Ticket>}
   */
  findByUsername(username) {
    const ticket = this.tickets.filter(
      /**
       * @param {Ticket} ticket
       */

      (ticket) => ticket.username === username
    );

    return ticket;
  }
  //==========================================//
  /**
   *
   * @param {string} ticketId
   * @param {{username:string,price:number}} ticketBody
   */
  updateById(ticketId, ticketBody) {
    const ticket = this.findById(ticketId);

    ticket.username = ticketBody.username ?? this.username;
    ticket.price = ticketBody.price ?? this.price;
    ticket.updatedAt = new Date();

    return ticket;
  }
  //==============================================//
  /**
   *
   * @param {string} username
   * @param {{username:string,price:number}} ticketBody
   */
  updateByUsername(username, ticketBody) {
    const ticket = this.findByUsername(username);

    ticket.reduce((acc, cur) => {
      cur.username = ticketBody.username ?? this.username;
      cur.updatedAt = new Date();
      return acc;
    }, []);

    return ticket;
  }
  //==============================================//
  /**
   *
   * @param {number} ticketId
   * @returns {Boolean}
   */
  deleteById(ticketId) {
    const index = this.tickets.findIndex((ticket) => ticket.id === ticketId);

    if (index !== -1) {
      this.tickets.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }

  //==============================================//
  /**
   *
   * @param {String} username
   * @returns {Ticket<Array>}
   */
  deleteByUsername(username) {
    const tickets = this.find();

    const filteredTickets = tickets.filter((item) => {
      return item.username !== username;
    });

    this.tickets = filteredTickets;
  }
  //==============================================//
  /**
   *
   * @param {number} winnerCount
   */
  draw(winnerCount) {
    if (winnerCount > this.tickets.length) {
      console.error(
        "Error: Not enough tickets available for the specified winner count."
      );
      return null;
    }

    let winnerIndexes = [];

    while (winnerIndexes.length < winnerCount) {
      let winnerIndex = Math.floor(Math.random() * this.tickets.length);
      if (!winnerIndexes.includes(winnerIndex)) {
        winnerIndexes.push(winnerIndex);
      }
    }

    const winners = winnerIndexes.map((index) => this.tickets[index]);
    return winners;
  }
}

const myDB = new MyDB();

module.exports = myDB;
