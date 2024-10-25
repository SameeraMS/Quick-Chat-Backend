"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageProvider = void 0;
const message_entity_1 = require("./message.entity");
exports.MessageProvider = [
    {
        provide: "MESSAGE_REPOSITORY",
        useValue: message_entity_1.Message,
    },
];
//# sourceMappingURL=message.provider.js.map