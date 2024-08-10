/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable eol-last */
import 'dotenv/config';

const CONFIG = {
    db: process.env.DB,
    jwt_public: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3wIpx332Sp8tceMeCHTP
CpDUlnxICXotFGIOJe4dPnupMz0Ctgjid2B29SCPRMVT/0CH7KowWP/Gk1sp9HUn
5QIS7iY/dlFsG367bC9yYO0JR7JkxjjyuNtx5WBoMuuIwhKMDedyZfi7a2RolN7R
P/Ih1wOLpFnPPdJu4ql4VToHB7aLPxkmLwGO0wwdzGhp8cOh9GrRddVcwFaQwW18
C1fZ0dbNSS1LHgiuyiwRujO0dK6PW+yHhbGsD/UtToe/ZRwgrt5XGEAOw1H7X1j+
MANYO2my6CmJGvUlgRuJ7efUC3eg+gwsMm3MRB+tIOdKMmmQRmxHnsCd3nZO/Frw
EwIDAQAB
-----END PUBLIC KEY-----`,
    jwt_private: `-----BEGIN RSA PRIVATE KEY-----
MIIEpQIBAAKCAQEA3wIpx332Sp8tceMeCHTPCpDUlnxICXotFGIOJe4dPnupMz0C
tgjid2B29SCPRMVT/0CH7KowWP/Gk1sp9HUn5QIS7iY/dlFsG367bC9yYO0JR7Jk
xjjyuNtx5WBoMuuIwhKMDedyZfi7a2RolN7RP/Ih1wOLpFnPPdJu4ql4VToHB7aL
PxkmLwGO0wwdzGhp8cOh9GrRddVcwFaQwW18C1fZ0dbNSS1LHgiuyiwRujO0dK6P
W+yHhbGsD/UtToe/ZRwgrt5XGEAOw1H7X1j+MANYO2my6CmJGvUlgRuJ7efUC3eg
+gwsMm3MRB+tIOdKMmmQRmxHnsCd3nZO/FrwEwIDAQABAoIBAHu7bYbcIqzgiIxp
4R38AWvxU6JzLlzjxuNKTGNLLDqgzg45yalKYKyvfxEekZ8shSBYo5HyE4Ut1PWp
XSvfXNU5Q1uTKR7yqjLPLBoocSPKIJ4BItzAeBuM1jLYPLgT6vsS41ZLljNxwDsj
qMsAncUHCTONKgt0MQIyIYftU3ClClO9x7q0srmb7tN1Kh3Uvdu9faD+/5J0S+iU
J2UQrrpLaWDDiqYRVbCPIHRCUTAnnVXAweTfws8HMdg6JkYv+EgguIt4OzKsoYRy
3zT7jD9dgGMoz5sMdZJ7cIoy1h1f0TckSIbHqUBr8otayVRWd3/X/ONipWSFlSbY
s2bCB1ECgYEA87xbS2NAFtSzgS1Et2UDkKAC+p2l9/kZXSZvlybqgMFNJdHJC5wl
NI1Qq5lgjZl/pWLAo7SonSrocoRgmQdzCHSiQ8UdjYJZONr1r3z9jn3wZVVLLMYH
oHnoBI0Z2/u4lr2kH5bVRuTS++Jn9zf8wMg6oCk85EdRlrdny4/2l68CgYEA6jrP
mfiumMcPH7eiGnlebimOksOCXvKFETzxA8Ldvy+q9QX5p049qqqJdGrUdhJrgUS3
ss/9KZlqqszCeoH6fkACrgJYst37TrY+rFZrJEJcK3v8LQg1pTfupqpXUNCzhdrR
sPyX7NXwZ0K3fpt1xGkTGGrNA+irJ5ArbulnYt0CgYEA8S1TpRBLrYvBJ7R0h4hT
87rx161BOlNpjqvmxcmDR+5+eUrRxkQ26H5g8bvuN49JKIzEE/lC02pO4mos75/Y
auiGW8rjyE/QG5tGeuSSPXpO8uZoYaB+kYOvWzmH+g5mA/sZOQzWc7UfNJE+0Pi8
iMJYiHzlvPj5Ocq30Uzd9A8CgYEAqxhKjS4aW38MjR6WSsBdOhshChPGJ5T/npfl
ddniIMWxG0pCEvQUF5Z60Y83owfRf5uyk+taAgkO4bSwWsyXLaGUU4djQ0TjTZvS
LBD0MohGy3zFuB9HEGjK6vOC1IWenSg6BA5+64FbGhKh9tmYLOCUEkHxf+l1HHEz
SNE1tAECgYEAidf8XjrCpznYiUMkNXfxH+fEikWzpt+D12NvyybbiYKRparEZDcr
XO/OTVOWeRkVDfhWwgcT1xY/8cbzpsBItTdM+tALmGpm5b4aQOQ3iEXzSl2RROS/
7aXdQh8X3NT3K2ppiKzaypisflZ5/NGSeUJoPJoB3MD5rVtIckgxOsY=
-----END RSA PRIVATE KEY-----`
}

export default CONFIG