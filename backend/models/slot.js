class Slot {
    constructor(id, doctorId, startTime, endTime, capacity) {
        this.id = id;
        this.doctorId = doctorId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.capacity = capacity;
        this.tokens = [];
    }
}
module.exports = Slot;
