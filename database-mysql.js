import { randomUUID } from "node:crypto";
import { sql } from "./db.js";

export class DatabaseMYSQL{

    async list(search){
        let videos;

        if (search){
            [videos] = await sql.execute(
                'SELECT * FROM videos WHERE title LIKE ?',
                [`${search}$`]
            );
        }else{
            [videos] = await sql.execute('SELECT * FROM videos');
        }

        return videos;
    };

    async create(video){
        const videoId = randomUUID();
        const { title, description, duration } = video;

        await sql.execute(
            'INSERT INTO videos (id, title, description, duration) VALUES (?, ?, ?, ?)' , 
            [videoId, title, description, duration]
        );
    };

    async update(id, video){
        const { title, description, duration } = video;
        await sql.execute(
            'UPDATE videos SET title = ?, description = ?, duration = ? WHERE id = ?',
            [title, description, duration, id]
        );
    }

    async delete(id){
        await sql.execute('DELETE FROM videos WHERE id = ?', [id]);
    }
}