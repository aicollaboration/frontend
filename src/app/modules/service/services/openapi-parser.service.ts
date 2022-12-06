import { Injectable } from '@angular/core';

export interface OpenApiPath {
    operationId: string;
    path: string;
}

export interface OpenApiInterface {
    schemas: any;
    servers: any;
    paths: Array<OpenApiPath>;
}

@Injectable({
    providedIn: 'root'
})
export class OpenApiParserService {
    public async parse(api: any): Promise<OpenApiInterface> {
        const result: OpenApiInterface = {
            schemas: {},
            servers: api.servers,
            paths: [],
        };
        for (const [path, pathConfig] of Object.entries(api.paths)) {

            for (const [method, methodConfig] of Object.entries(pathConfig)) {
                if (method === 'get') {
                    result.schemas[methodConfig.operationId] = {
                        path,
                        method,
                    };
                    result.paths.push({
                        operationId: methodConfig.operationId,
                        path,
                    });
                } else {
                    const request = methodConfig.requestBody;

                    for (const [contentType, content] of Object.entries(request.content)) {
                        let schema = content['schema'];
                        if ('$ref' in schema) {
                            schema = this.resolveReference(api, schema.$ref);
                        }

                        result.schemas[methodConfig.operationId] = {
                            schema,
                            path,
                            method,
                            contentType,
                        };
                        result.paths.push({
                            operationId: methodConfig.operationId,
                            path,
                        });
                    }
                }

            }
        }
        return result;
    }

    /**
     * 
     * '#/components/schemas/Input' --> api["components"]["schemas"]["Input"]
     * 
     * @param rootPath 
     * @param reference 
     * 
     * @returns 
     */
    private resolveReference(rootPath: string, reference: string) {
        let path = rootPath;
        const referencePaths = reference.split("/").filter(item => item !== '#');
        for (const referencePath of referencePaths) {
            path = path[referencePath];
        }

        return path;
    }
}