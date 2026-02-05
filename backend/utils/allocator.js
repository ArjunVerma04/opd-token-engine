const PRIORITY = { emergency: 4, paid: 3, followup: 2, online: 1, walkin: 0 };

function allocateToken(slot, token) {
    if (token.source === 'emergency') {
        slot.tokens.push(token);
        return 'Emergency token added';
    }
    if (slot.tokens.length < slot.capacity) {
        slot.tokens.push(token);
        return 'Token added';
    } else {
        let lowest = slot.tokens[0];
        for (let t of slot.tokens) {
            if (PRIORITY[t.source] < PRIORITY[lowest.source]) lowest = t;
        }
        if (PRIORITY[token.source] > PRIORITY[lowest.source]) {
            lowest.status = 'replaced';
            slot.tokens = slot.tokens.filter(t => t.id !== lowest.id);
            slot.tokens.push(token);
            return 'Token replaced lower priority token';
        } else {
            return 'Slot full, token not added';
        }
    }
}

function cancelToken(slot, tokenId) {
    const token = slot.tokens.find(t => t.id === tokenId);
    if (!token) return false;
    token.status = 'cancelled';
    return true;
}

module.exports = { allocateToken, cancelToken };
