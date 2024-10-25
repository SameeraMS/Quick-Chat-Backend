"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelProvider = void 0;
const channel_entity_1 = require("./channel.entity");
exports.ChannelProvider = [
    {
        provide: "CHANNEL_REPOSITORY",
        useValue: channel_entity_1.Channel,
    },
];
//# sourceMappingURL=channel.provider.js.map