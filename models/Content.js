export default class Content {
    constructor(id, title, publishAt, smallImg) {
        this.id = id;
        this.title = title;
        this.publishAt = publishAt;
        this.smallImg = smallImg;
    }

    static fromJson(json) {
        return new Content(json['id'] ,json['title'], json['published_at'],
            // if data is null, return empty string
            json['medium_image'][0] ? json['medium_image'][0]['url'] : '',
            );
    }

    static async getContents(pageNumber, pageSize, sortBy) {
        const URL = `https://suitmedia-backend.suitdev.com/api/ideas?page[number]=${pageNumber}&page[size]=${pageSize}&append[]=small_image&append[]=medium_image&sort=${sortBy}`;
        const response = await fetch(URL, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const json = await response.json();
        return json.data.map(Content.fromJson);
    }

    static async getTotalContents() {
        const URL = `https://suitmedia-backend.suitdev.com/api/ideas?append[]=small_image&append[]=medium_image&sort=-published_at`;
        const response = await fetch(URL, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const json = await response.json();
        return json.meta.total;
    }
}