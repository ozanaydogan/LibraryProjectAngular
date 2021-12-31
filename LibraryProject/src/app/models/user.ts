export class User {
    constructor(
        public email: string, 
        public id: string, 
        private _token: string,
        private _tokenExpirationDate: Date) { }

    get token() {
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;        // user modelinde oluşturulan kayıdın bir token bilgisi olur, bu token bilgisi ile kullanıcının login logout durumları kontrol edilebilir.
        }
        return this._token;
    }
}