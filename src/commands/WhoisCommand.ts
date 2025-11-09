import { ChatInputCommandInteraction, CacheType, MessageFlags, Guild, EmbedBuilder, User, userMention, GuildMember } from "discord.js";
import Command from "./Command";
import { fetchStats } from "../api/malla/Stats";
import logger from "../Logger";
import meshRedis from "../MeshRedis";
import { NodeSearchNodeResponse, searchNode } from "../api/malla/Nodes";

export default class WhoisCommand extends Command {

    constructor() {
        super("whois");
    }

    public async handle(guild: Guild, interaction: ChatInputCommandInteraction): Promise<void> {
        let nodeId = this.fetchNodeId(interaction);
        const response = await searchNode(nodeId);

        if (response === null || response === undefined) {
            await interaction.reply({
                content: "Error contacting Malla API",
                flags: MessageFlags.Ephemeral,
            });
            return;
        }

        if (response === false) {
            await interaction.reply({
                content: "Node not found",
                flags: MessageFlags.Ephemeral,
            });
            return;
        }

        let node: NodeSearchNodeResponse = response.nodes[0];

        let nodeOwner: string | null  = await meshRedis.getDiscordUserId(node.hex_id);
        let fields = [
                { name: 'Primary Channel',  value: node.primary_channel, inline: true },
                { name: 'Role',  value: node.role, inline: true },
                { name: 'Hardware Model',  value: node.hw_model },
                { name: 'Last Packet Time',  value: this.convertTimestampToDateTime(node.last_packet_time), inline: true },
                { name: 'Gateway Packet Count (24h)',  value: node.gateway_packet_count_24h.toString() },
                { name: 'Packet Count (24h)',  value: node.packet_count_24h.toString(), inline: true }
        ];

        if (nodeOwner) {
            const user: User = await guild.client.users.fetch(nodeOwner);

            fields.unshift(
                { name: 'Owner',  value: userMention(user.id), inline: true }
            );
        }

        let embed = (new EmbedBuilder())
            .setTitle(`${node.hex_id} (${node.long_name}) ${node.short_name}`)
            .setURL(`https://malla.tnmesh.org/node/${node.node_id}`)
            .addFields(fields)
            .setTimestamp(node.last_packet_time * 1000)
            .setColor(0x0099ff)

        await interaction.reply({ embeds: [embed] });

    }

    private convertTimestampToDateTime(timestamp: number): string {
        return (new Date(timestamp * 1000)).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short',
            timeZone: 'America/Chicago'
        });
    }
}