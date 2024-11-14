const qs = require("qs")
const Fuse = require('fuse.js')
const fs = require('fs')
const path = require('path')

async function saveImages(formats) {
    const saveImage = async (imageUrl) => {
        const pathFolders = imageUrl.split('/')
        const imagePath = path.join(path.resolve(__dirname, '../public'), ...pathFolders)

        try {
            const response = await fetch(`http://localhost:1337${imageUrl}`);

            if (!response.ok) {
                throw new Error(`Failed to fetch image: ${response.statusText}`);
            }

            const arrayBuffer = await response.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            fs.writeFileSync(imagePath, buffer);
            console.log(`Image downloaded and saved to ${imagePath}`);
        } catch (error) {
            console.error(`Error downloading the image: ${error.message}`);
        }
    }

    for (let size of ["thumbnail", "small", "medium", "large"]) {
        saveImage(formats[size].url);
    }
}

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
        method: 'GET'
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
                            saveImages(showcase.cover_image.formats)
                            showcase["type"] = "Showcases"
                            showcase["thumbnail"] = showcase.cover_image.formats.thumbnail.url

                            for (let key of ["id", "cover_image", "createdAt", "updatedAt", "publishedAt"]) {
                                delete showcase[key];
                            }

                            indexData.push(showcase)
                        })
                    }

                    saveImages(service.cover_image.formats)

                    service["thumbnail"] = service.cover_image.formats.thumbnail.url
                    service["type"] = "Services"

                    for (let key of ["showcases", "cover_image", "id", "createdAt", "updatedAt", "publishedAt"]) {
                        delete service[key];
                    }

                    indexData.push(service)
                })
            }

            for (let key of ["services", "id", "createdAt", "updatedAt", "publishedAt"]) {
                delete cat[key];
            }

            cat["type"] = "Categories"

            indexData.push(cat)
        });

        const fuseIndex = Fuse.createIndex(["name", "description", "link", "type"], indexData)

        fs.writeFile(path.join(path.resolve(__dirname, '../app/lib/data'), 'search_data.json'), JSON.stringify(indexData), err => {
            if (err) {
                console.error(err);
            } else {
                console.log("file written successfully")
            }
        });

        fs.writeFile(path.join(path.resolve(__dirname, '../app/lib/data'), 'search_index.json'), JSON.stringify(fuseIndex.toJSON()), err => {
            if (err) {
                console.error(err);
            } else {
                console.log("file written successfully")
            }
        });
    }
}

generateIndex()
