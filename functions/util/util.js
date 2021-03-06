const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Authenticating the user
exports.handleAuth = (context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('permission-denied', 'User not logged in');
    }
    return true;
};

// Validating string inputs
exports.checkString = (text) => {
    if (!(typeof text === 'string') || text.length === 0) {
        throw new functions.https.HttpsError('invalid-argument', 'Expected String input parameter is missing or empty');
    }
    return text;
};

exports.checkStringTest = (text) => {
    if (!(typeof text === 'string') || text.length === 0) {
        return false;
    }
    return text;
};

// Validating array inputs
exports.checkArray = (value) => {
    if(!(Array.isArray(value)))
    {
        throw new functions.https.HttpsError('invalid-argument', 'Expected array parameter is missing');
    }
    return value;
};

exports.checkArrayTest = (value) => {
    if(!(Array.isArray(value)))
    {
        return false;
    }
    return value;
};

exports.isNumber = (value) => {
    return typeof value === 'number';
};

exports.checkemail = (email) => {
    if (!(typeof email === 'string') || email.length === 0) {
        throw new functions.https.HttpsError('invalid-argument', 'Expected Email input parameter is missing or empty');
    } else {
        const atposition = email.indexOf("@");
        const dotposition = email.lastIndexOf(".");
        if ((atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= email.length)) {
            throw new functions.https.HttpsError('invalid-argument', 'Email address is not in the correct format');
        }
    }
    return email;
}

exports.checkEmailTest = (email) => {
    if (!(typeof email === 'string') || email.length === 0) {
        return false;
    } else {
        const atposition = email.indexOf("@");
        const dotposition = email.lastIndexOf(".");
        if ((atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= email.length)) {
            return false;
        }
    }
    return email;
}

exports.checkObject = (value) => {
    if(!(typeof value === 'object'))
    {
        throw new functions.https.HttpsError('invalid-argument', 'Expected json object parameter is missing');
    }
    return value;
};

exports.checkBool = (value) => {
    if(!(typeof value === 'boolean'))
    {
        throw new functions.https.HttpsError('invalid-argument', 'Expected boolean parameter is missing');
    }
    return value;
};

// creating ID for users
exports.makeID = (length) => {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    result = result + admin.firestore.Timestamp.now().seconds.toString();
    return result;
}

// creating passwords for users
exports.makePassword = (length) => {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    result = result + admin.firestore.Timestamp.now().seconds.toString();
    return result;
}