import { Injectable } from "@nestjs/common";
import sequelize, { Op } from "sequelize";
import { Message } from "src/message/message.entity";
import { User } from "src/user/user.entity";
import { Channel } from "./channel.entity";
import { ChannelDto } from "./dto/create-channel-dto";

// Define ChannelCreationAttributes type based on your ChannelDto
type ChannelCreationAttributes = Partial<ChannelDto>; // Modify as needed based on Channel entity

@Injectable()
export class ChannelService {
  // Get a single channel by ID
  async getChannel(id: string) {
    try {
      const channel = await Channel.findByPk(id);
      if (!channel) {
        return {
          statusCode: "404",
          message: "Channel not found.",
        };
      }

      // Fetch participants in a single query
      const participants = await User.findAll({
        where: {
          id: {
            [Op.in]: channel.participants,
          },
        },
      });

      channel.participants = participants.map((user) => user.id); // Update to store only IDs
      return channel;
    } catch (error) {
      console.error("Error fetching channel:", error);
      return {
        statusCode: "500",
        message: "Internal server error.",
      };
    }
  }

  // Create a new channel
  async createChannel(channelDto: ChannelCreationAttributes) {
    try {
      const channel = await Channel.create(channelDto);
      return {
        statusCode: "201",
        message: "Channel created successfully.",
        channel,
      };
    } catch (error) {
      console.error("Error creating channel:", error);
      return {
        statusCode: "400",
        message: error.message || "Bad request.",
      };
    }
  }

  // Get channels by user ID
  async getChannelsByUser(userId: string) {
    try {
      const channels = await Channel.findAll({
        where: sequelize.where(
          sequelize.fn(
            "JSON_CONTAINS",
            sequelize.col("participants"),
            JSON.stringify(userId)
          ),
          true
        ),
        order: [["updatedAt", "DESC"]],
        attributes: { exclude: ["messages", "createdAt"] },
      });

      const lastMessages = await Promise.all(
        channels.map((channel) =>
          Message.findOne({
            where: { channelId: channel.id },
            order: [["createdAt", "DESC"]],
          })
        )
      );

      return {
        lastMessages,
        channels,
      };
    } catch (error) {
      console.error("Error fetching channels:", error);
      return {
        statusCode: "500",
        message: "Internal server error.",
      };
    }
  }

  // Update an existing channel
  async updateChannel(id: string, channel: Partial<ChannelDto>) {
    try {
      const [updatedRows] = await Channel.update(channel, { where: { id } });
      if (updatedRows === 0) {
        return {
          statusCode: "404",
          message: "Channel not found.",
        };
      }
      return {
        statusCode: "200",
        message: "Channel updated successfully.",
      };
    } catch (error) {
      console.error("Error updating channel:", error);
      return {
        statusCode: "500",
        message: "Internal server error.",
      };
    }
  }

  // Delete a channel by ID
  async deleteChannel(id: string) {
    try {
      const deletedRows = await Channel.destroy({ where: { id } });
      if (deletedRows === 0) {
        return {
          statusCode: "404",
          message: "Channel not found.",
        };
      }
      return {
        statusCode: "200",
        message: "Channel deleted successfully.",
      };
    } catch (error) {
      console.error("Error deleting channel:", error);
      return {
        statusCode: "500",
        message: "Internal server error.",
      };
    }
  }
}
