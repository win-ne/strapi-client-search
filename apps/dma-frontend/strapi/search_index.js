const qs = require("qs")
const Fuse = require('fuse.js')
const fs = require('node:fs')
const path = require('node:path')

async function generateIndex() {
    const query = qs.stringify(
        {
            populate: {
                services: {
                    populate: {
                        cover_image: true,
                        showcases: {
                            populate: {
                                cover_image: true
                            }
                        }
                    }
                }
            }
        },
        {
            encodeValuesOnly: true,
        }
    );
    const resp = await fetch(`http://localhost:1337/api/categories?${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    if (!resp.ok) {
        const err = await resp.text()

        try {
            const errResp = JSON.parse(err)
            console.log(errResp)
        } catch {
            console.log({ error: { message: err } })
        }
    } else {
        let indexData = []
        let respData = []
        const body = await resp.json()

        if (body?.error) {
            respData = body
        } else {
            respData = body?.data || body
        }

        respData.forEach(cat => {
            if (cat["services"]) {
                cat["services"].forEach(service => {
                    if (service["showcases"]) {
                        service["showcases"].forEach(showcase => {
                            showcase["type"] = "Showcases"
                            showcase["thumbnail"] = showcase.cover_image.formats.thumbnail.url
                            delete showcase["id"]
                            delete showcase["cover_image"]
                            delete showcase["createdAt"]
                            delete showcase["updatedAt"]
                            delete showcase["publishedAt"]
                            indexData.push(showcase)
                        })
                    }

                    service["thumbnail"] = service.cover_image.formats.thumbnail.url
                    service["type"] = "Services"
                    delete service["showcases"]
                    delete service["cover_image"]
                    delete service["id"]
                    delete service["createdAt"]
                    delete service["updatedAt"]
                    delete service["publishedAt"]
                    indexData.push(service)
                })
            }

            delete cat["services"]
            delete cat["id"]
            delete cat["createdAt"]
            delete cat["updatedAt"]
            delete cat["publishedAt"]
            cat["type"] = "Categories"
            indexData.push(cat)
        });

        const fuseIndex = Fuse.createIndex(["name", "description", "link", "type"], indexData)

        fs.writeFile(path.join(path.resolve(__dirname, '../public'), 'search_data.json'), JSON.stringify(indexData), err => {
            if (err) {
                console.error(err);
            } else {
                console.log("file written successfully")
            }
        });

        fs.writeFile(path.join(path.resolve(__dirname, '../public'), 'search_index.json'), JSON.stringify(fuseIndex.toJSON()), err => {
            if (err) {
                console.error(err);
            } else {
                console.log("file written successfully")
            }
        });
    }
}

generateIndex()
