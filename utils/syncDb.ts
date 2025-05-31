import { supabase } from "./supabaseInit";
/**
 * Syncs the database with the provided entities by upserting them.
 * If no entities are provided, it logs a warning and returns an empty array.
 *
 * @param {any[]} entities - The entities to upsert into the database.
 * @param {string} entityType - The type of entity being upserted (e.g., "users", "posts").
 * @returns {Promise<any[]>} - A promise that resolves to the upserted entities or an empty array if none were upserted.
 */

async function addUserIdToEntities(entities: any[]): Promise<any[]> {
    const user = await supabase.auth.getUser();
    if (user.data.user && user.data.user.id) {
        return entities.map((entity) => ({
            ...entity,
            user_id: user.data.user.id,
        }));
    }
    return entities;
}

export async function syncDbUpserts(
    entities: any[],
    entityType: string,
): Promise<any[]> {
    try {
        if (!entities || entities.length === 0) {
            console.warn(`No entities to upsert for ${entityType}`);
            return [];
        }
        const entitiesWithUserId = await addUserIdToEntities(entities);

        const { data, error } = await supabase
            .from(entityType)
            .upsert(entitiesWithUserId, { onConflict: "id" })
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
        const entitiesWithUserId = await addUserIdToEntities(entities);

        const { data, error } = await supabase
            .from(entityType)
            .delete()
            .in(
                "id",
                entitiesWithUserId.map((entity) => entity.id),
            );

        if (error) {
            throw error;
        }

        console.log(
            `Successfully deleted ${entitiesWithUserId.length} ${entityType} entities.`,
        );
    } catch (error) {
        console.error("Error deleting entities from database:", error);
    }
}
