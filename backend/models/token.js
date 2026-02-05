class Token {
    constructor(id, patientId, source) {
        this.id = id;
        this.patientId = patientId;
        this.source = source; // online, walkin, paid, followup, emergency
        this.status = 'active';
    }
}
module.exports = Token;
