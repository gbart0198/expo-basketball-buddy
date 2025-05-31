import { supabase } from "./supabaseInit";
export async function syncDbUpserts(
    entities: any[],
    entityType: string,
): Promise<any[]> {
    try {
        if (!entities || entities.length === 0) {
            console.warn(`No entities to upsert for ${entityType}`);
            return [];
        }

        const { data, error } = await supabase
            .from(entityType)
            .upsert(entities, { onConflict: "id" })
            .select();

        if (error) {
            throw error;
        }

        if (!data || data.length === 0) {
            console.warn(`No ${entityType} entities were upserted.`);
            return [];
        }

        console.log(`Successfully upserted ${data.length} ${entityType} entities.`);
        return data;
    } catch (error) {
        console.error("Error syncing database:", error);
        return [];
    }
}

export async function syncDbDeletes(entities: any[], entityType: string) {
    try {
        if (!entities || entities.length === 0) {
            console.warn(`No entities to delete for ${entityType}`);
            return false;
        }

        const { data, error } = await supabase
            .from(entityType)
            .delete()
            .in(
                "id",
                entities.map((entity) => entity.id),
            );

        if (error) {
            throw error;
        }

        console.log(
            `Successfully deleted ${entities.length} ${entityType} entities.`,
        );
    } catch (error) {
        console.error("Error deleting entities from database:", error);
    }
}
