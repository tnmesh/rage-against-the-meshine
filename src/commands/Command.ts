import { CacheType, ChatInputCommandInteraction, Guild } from "discord.js";
import { fetchNodeId as _fetchNodeId } from "../NodeUtils";

export default abstract class Command {
    protected name: string;

    constructor(name: string) {
        this.name = name;
    }

    abstract handle(guild: Guild, interaction: ChatInputCommandInteraction): Promise<void>;

    public fetchNodeId(interaction: ChatInputCommandInteraction<CacheType>): string | null {
      return _fetchNodeId(interaction);
    };

}