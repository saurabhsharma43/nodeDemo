// module.exports = function(req, res, next) {
//     req.testVar = 'Talib';
//     const token = req.headers.Authorization.split(" ")[1];
//     if (token is verfiy) {
//         const decodedPayload = decodeToken;
//         const userINfo = users.findOne({ _id: decodedPayload._id });
//         if (!userINfo) {
//             return res.status(401).json({ success: false, message: "Invalid user" });
//         }
//         req.currentUser = userINfo;
//     }
//     next();
// };