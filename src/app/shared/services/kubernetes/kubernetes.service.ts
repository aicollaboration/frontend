import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class KubernetesService {
    private clientSecret: string;
    private clientKey: string;
    private config: { apiVersion: string; clusters: { cluster: { "certificate-authority-data": string; server: string; }; name: string; }[]; contexts: { context: { cluster: string; user: string; }; name: string; }[]; "current-context": string; kind: string; preferences: {}; users: { name: string; user: { "client-certificate-data": string; "client-key-data": string; }; }[]; };

    public constructor(private http: HttpClient) {
        this.clientSecret = "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSURJVENDQWdtZ0F3SUJBZ0lJR3pVcUVWU1ZoRXd3RFFZSktvWklodmNOQVFFTEJRQXdGVEVUTUJFR0ExVUUKQXhNS2EzVmlaWEp1WlhSbGN6QWVGdzB5TVRBM01EZ3hNREV5TlRaYUZ3MHlNakEzTURneE1ERXlOVGhhTURReApGekFWQmdOVkJBb1REbk41YzNSbGJUcHRZWE4wWlhKek1Sa3dGd1lEVlFRREV4QnJkV0psY201bGRHVnpMV0ZrCmJXbHVNSUlCSWpBTkJna3Foa2lHOXcwQkFRRUZBQU9DQVE4QU1JSUJDZ0tDQVFFQXNnKytQZ2R5UVN2cEMwYzcKZ3psQjFNR3RGZ0VQdFhWY3FwbXNIcHFmR2Vma0xMTHFOMTBrc2FIVjl6dmZZMEV6RTJGUnphbzFOWlpOWTBwbQovRExzdHF4anFvZFpWWWttTEJrbTNDOHR1S2gxUUV1UFk0VllIZ0E4Vk5mZjlNU21yS1NrOWdvZXFZdnRSTGtpClBIeS9wazgySkNUd0RiWmZzak9xZmRhN3VubWNTMCtxY0ErRExmc09TTkRSY1BWNGtaakNtNmRpU0p5eE0vaGEKVWU1Q2FnajlMV3hiQ2dTK3o2REpFRkEvTkR5OGRnR2VpcFh0cjI2ck1pU24xRDhaYytZV05uR2xYN0J5L0FTTwpvQ1NCZnlFS0tTWHNCSzJnSndESVdiTm51bHQ4TERKUDBUd296UDUwWXlCUXI5S1hRMm9MblczNUhZazNQWWlkCkZjZXRnUUlEQVFBQm8xWXdWREFPQmdOVkhROEJBZjhFQkFNQ0JhQXdFd1lEVlIwbEJBd3dDZ1lJS3dZQkJRVUgKQXdJd0RBWURWUjBUQVFIL0JBSXdBREFmQmdOVkhTTUVHREFXZ0JRU0dldW1VNklyemQ0WlZjTHRabitCcnc5RQowREFOQmdrcWhraUc5dzBCQVFzRkFBT0NBUUVBVnRwZ2FUVkc3eWVjY3h2emJkeDhwSDV0dDUvYTd0UW9nRkp6ClRiR0VxQmE2ZmZaS2EvNUVQZmcxdGJHNldyVDRkV0xCRWg5MUF6WDhHb0NPaXhpQlBlMUFIM1hXMkxXdUVmNE0KMlJDMUo2eEhYelRTMjJXWXdVeSs5RHJLbEpLRVVPTkxlUG1XdnBJajFDMVNBSjdQZVcrZFhzS2FwcWd3R2FkQwp5ZDBLUG1WcU5QNjF0Uk41VUc0OUEyd0E4QXF4TGtnRWF0QXd4YjlaZEtOc3JGZE92b0U1cWZTeE4vR2JJTTEzCmVZQjQ4NVZtUjJEOWtqa2dISldlWEQrMnJwY0VsMHRpdjUxK2dUdE9PRUpBejZ0aXhpNmg4QlpvV21WZW9CSmIKMUg5bUs3V2JiRXlnVnU1akNwcWxYaUhPTk1uWDBSR0NEU2dwMTZ3WXQzWHQxZlpmUGc9PQotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tCg==";
        this.clientKey = "LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFb3dJQkFBS0NBUUVBc2crK1BnZHlRU3ZwQzBjN2d6bEIxTUd0RmdFUHRYVmNxcG1zSHBxZkdlZmtMTExxCk4xMGtzYUhWOXp2ZlkwRXpFMkZSemFvMU5aWk5ZMHBtL0RMc3RxeGpxb2RaVllrbUxCa20zQzh0dUtoMVFFdVAKWTRWWUhnQThWTmZmOU1TbXJLU2s5Z29lcVl2dFJMa2lQSHkvcGs4MkpDVHdEYlpmc2pPcWZkYTd1bm1jUzArcQpjQStETGZzT1NORFJjUFY0a1pqQ202ZGlTSnl4TS9oYVVlNUNhZ2o5TFd4YkNnUyt6NkRKRUZBL05EeThkZ0dlCmlwWHRyMjZyTWlTbjFEOFpjK1lXTm5HbFg3QnkvQVNPb0NTQmZ5RUtLU1hzQksyZ0p3RElXYk5udWx0OExESlAKMFR3b3pQNTBZeUJRcjlLWFEyb0xuVzM1SFlrM1BZaWRGY2V0Z1FJREFRQUJBb0lCQUhONGlpS25xWXhoOFdzQwo4ckVTZklLQVpzS1NSYUdqVGtqRUJ6NkJmeFBKc2NyYTY5Q2pjcHhQR3ZhTnVUd2dtQUxGWmNzOXlldktZTDAzCkRyb1dQRFBxYjJlekJsZlY3UTlEOEZOeHRQQy9MZXBZRmRDd05JaWdGbi9lenJsb25iM3Z0NXBtemFPZHZteUcKc3BFUFJTbVF6TWQ3dk1EbnQvOVVTZ2Y1TFJ5cmt1c3kxZVB1SWhLUnB0UHV4SUorUXZLRHoxVWlqSXp1enZIVQordXU2S3VrUXptSGRIUkw4SWc0TnExQldPUFQ3dzZKVWNzUEJ5dUlXQVBmQmlRdFJiT3dHaDZyYkFIb3BWT3lrCnVheVhsUThiREdNYUZBVE5HdlZhQXRiUVFmRnB0VlFieUp0eVBqR1BDY24vckp1NzhLdnV3M0l2RFRHZXppN1oKOVNXWE1BRUNnWUVBNWI5ZGZHRnZENlE4QjNXajBJY0RkTllCV2xmS1pXTGRLN2NETHVzTUNMaEhPRXpCMS9BTwoydVVtdFpVRG1nU0RTMlJUbXprb3lLMW9KQzNXQVlFSTdWRmxsZnpXRUg1aHhnVXFUTFRLSlJRdUJaaEVrcWJZCkFTUkFMSUpPOGVuOXNJa3F4Q3A1ZEZLUlRlMmU5aDZwTTY1K3JtV1pJQkh6ZUVyaHVldWkwdUVDZ1lFQXhtaHgKMzBiY3Z6QjZxY200cG9GUDRHZjMzbmNUZEZ2MUxnWEo1RmdWVmxLaWtnd0oyK004U1h2S1J2VnNXR2M3bmxSTQpxb2V1MVZSVFhvY3lDNUE2SllBSjR5dlZlOWJkR2ZwdXducEZqczUxRkxoYkRjUVZSM3h5S0R1YTlPQlJuSVdhCmxtMFdENDRnd0hBeUhkcDZEYnd5T29wN3VqbU9lSHlYQW1Td3pxRUNnWUE4TElRQ3lNNDY3WXdmZEF0azJZZnAKT1FmL3JwQy9QMGFvWlhXNit5c2F1WkZGeUt6WXJ2SmxHTEdyeTR5MjhVbW1IRy9kYnZva25XNXlVMk1DMzlZRAp1bGIrRXN2S1pCK2Rxc3FxYm91bmJJS2xTbjFqWDdtaGl1b1gva1ZKRFQwNTJLTlAzOFFSMkhKZ1U4Vlh0eTRmCjhDc1Q2RjVUelAvVTJPQUlQeFJWWVFLQmdRQ0grNHVZSU9Rb3NWeFF4QzJuQ05lckVQYmtaUzVUUUxkZ3pKemIKd0xjWEM5bmFTUi8wc2VCZTZOWHhIa0ljc053K25yNVEzbCtvWEh3clBIUERVeDFYR0ZNdWZKdDduZjY1MEZkYgpPUncxVFRFWGUyY0VuMUNLUnpPaWVYK3h0NUNYdTBZQk5WQzZab254K3JPT25HK3N2RUNjdU04bUNrNm9LNVFBCkV1elBJUUtCZ0d4a2lNR0xLcUpzNEdUYU05OFlmd0RRak9kRi93MkRjSjhYL3pRRUFFemFiRFFHRVJQSHR5QWUKdkplRWpHYzNoWnBRQWhwL1R3VThqZjRxRHdJRytLYVM3ZUVUWkI4d3NvOFp5eG1mZm9ibVJiSk5UZjJmcGE2NQpCSjU2R2U4dDFiemJvcitwbXFSQUNGUHZ3Z1JFdjNyeldrUkFxcEkxa3lyTkp5R0NoQW8vCi0tLS0tRU5EIFJTQSBQUklWQVRFIEtFWS0tLS0tCg==";
        this.config = {
            "apiVersion": "v1",
            "clusters": [
                {
                    "cluster": {
                        "certificate-authority-data": "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUM1ekNDQWMrZ0F3SUJBZ0lCQURBTkJna3Foa2lHOXcwQkFRc0ZBREFWTVJNd0VRWURWUVFERXdwcmRXSmwKY201bGRHVnpNQjRYRFRJeE1EY3dPREV3TVRJMU5sb1hEVE14TURjd05qRXdNVEkxTmxvd0ZURVRNQkVHQTFVRQpBeE1LYTNWaVpYSnVaWFJsY3pDQ0FTSXdEUVlKS29aSWh2Y05BUUVCQlFBRGdnRVBBRENDQVFvQ2dnRUJBS1lyCmt2QmdsZ2dtVU9tWTRGVGY4eVVIUlNIdzBqcHljQ0EyWXI4SGpxQkNta3VkNHd1eDB6MjQ4SGhHRHRFQlRZSlIKK3NKZ05IL0pzMFRPYlVzeFJhZVBiM3daZGxaaHRpUTB2Qm1EbHIxUG9ZS051K2hBVkdydUtpOHJKSFcycTdSMwplR2xlYWJlQVk4UVRiOEd6QVJocGpmbTdDemhmK25OOUJVM1kyVlpjOHVnZ1dIdnJ3djY2bnNrazNhUUowWlpMClBCTXlOTXVnQzBpU2RJSEE1UEsxUHM4QzJ4N08vMVRYUURuMFRidEc4b0VTTXdISnp3ZVAxT3hOandKcWVydW0KNDRyTHNyVE9POHNNZ1dJVXB6aHNCL3VEdnBsQTJ4aTRwRVExNTQ0VWROY29CZklydDN3cklTWS96eVpWR3B4UgpHcG1zdVFQWkZIN2Y4QWJvdEpFQ0F3RUFBYU5DTUVBd0RnWURWUjBQQVFIL0JBUURBZ0trTUE4R0ExVWRFd0VCCi93UUZNQU1CQWY4d0hRWURWUjBPQkJZRUZCSVo2NlpUb2l2TjNobFZ3dTFtZjRHdkQwVFFNQTBHQ1NxR1NJYjMKRFFFQkN3VUFBNElCQVFCaW96RUs1am5BRm8wbS82MnZFNVFZYXFwRDMxR2RnMGJybW03M2hqTU9XbFg3RGx5bAp3eWZBbG4rUkdhOFZWZG1zM3V4NFg3cFg3Rjk3TUZQM042RjR6alBHRW1RN1lPU3Ara2ozS0VNU0toK09tOXdqCkhBc0xPK3lHb1c1WC8wdFY0U2VXOUFRM2tuK1hLNGplaWVEOUk2SldrWG9GV0kwK3oxUm9FbUVqbTczcFg5SHoKdmg0VkVBb0FEbmtYUndrME54UVp6VUpvc1FQb1ZWTnlkV3B2QWlsUHJLVkdYanBwekNFUUpad2R0WEZWL2xudApxbzJHWXJsb3gxSXpldncvQnc4NjZzQXJ4ZHdzNjJnQTZ6KzlFYmp1TjZIbVg5VDZ2T3hOcFUyZld6NWZQaHJOCmk3SkRjem8xUEFXTGN5eVNyUFFtZjZ3M1I2bW1jUVdrUjVWdQotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tCg==",
                        "server": "https://75.119.150.249:6443"
                    },
                    "name": "kubernetes"
                }
            ],
            "contexts": [
                {
                    "context": {
                        "cluster": "kubernetes",
                        "user": "kubernetes-admin"
                    },
                    "name": "kubernetes-admin@kubernetes"
                }
            ],
            "current-context": "kubernetes-admin@kubernetes",
            "kind": "Config",
            "preferences": {},
            "users": [
                {
                    "name": "kubernetes-admin",
                    "user": {
                        "client-certificate-data": this.clientSecret,
                        "client-key-data": this.clientKey,
                    }
                }
            ]
        }
    }

    public async getNodes(): Promise<void> {
        const agent = {
            rejectUnauthorized: false,
            cert: this.clientSecret,
            key: this.clientKey,
        };
    }

}