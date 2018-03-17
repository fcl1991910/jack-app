import { LOGIN_ATEMPT, LOGIN_DONE, LOGIN_FAIL } from "../constants/actionTypes";

export default (
  state = {
    loading: false,
    login_fail: false,
    access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijg1MWNkMjYyNDg1NzM4YzcyOGU3YzExNGE3NDE2N2ZhYjJiYmYxMmU3ODA4YjUxNWRiNjBlZTVhN2Q5YWJmNzNhZGNhZGM5ZmU1ODM5OGVlIn0.eyJhdWQiOiIyIiwianRpIjoiODUxY2QyNjI0ODU3MzhjNzI4ZTdjMTE0YTc0MTY3ZmFiMmJiZjEyZTc4MDhiNTE1ZGI2MGVlNWE3ZDlhYmY3M2FkY2FkYzlmZTU4Mzk4ZWUiLCJpYXQiOjE1MjEyNDc5NjIsIm5iZiI6MTUyMTI0Nzk2MiwiZXhwIjoxNTUyNzgzOTYyLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.DbAcECs7V6C7OKCDIVPzAK9UoMzg-akwRIdMSIb2z4wtOu3UYa2J7EwZSFl12M5Z33MTTbJ5XatWalD7YprQajEqVGOZF0Gwls3hayFmfTZ8IgaKAZ0-qb_OIz41pYSoIjElB02VUYh-Is78vsI0zkCNM_UcpDjlqyilBe_6NdRBqQDUTXeTxBB7WJ4WzPQ4yEiW-jEEQ9mKq9JjyxdFcwA5yKe2N33PKsnhkhtpQbVqSNBIpFqSsQCm2eC-sLVTCsakhY9Mp1u6EeIbHsUTpOQoSCMrNQNVEGKWsxNPHuqJfqZrJLKaH7zp4nK5YLs8v8YMI41pJ4ZbwtA_pDqF4nDqqq39fAWPOYdc4VUbfbxKr8ePDMjmMNzd73DZoMvIXa5T5nIQENR5hvPBUXvO63v2pgWXGMjXm4wo_MKjSPHJWH9OrQYcYNT0PZGXqlMbQGMjkOKoN5mn5Q7BSCOTl8iA7XwyuaaGUbtOeuMh9US20tlVrE-rQReFhp5btgB0fynB64O11fcLn3_NHM6JNaNyMfGoXEFTlv1VaPgoINzBJ8wDVdpoy3AttEPe-qtzWOqj__1NfN7BacbODoZ47G1EN1Ls79mmM55Sphy1_qNzeaMtfAOgELU0ulK6-L8yUC7x688hptMybBW6mMyh3aT19NYEQuugaNs38eossl8",
    refresh_token: ""
  },
  action
) => {
  switch (action.type) {
    case LOGIN_ATEMPT:
      return {
        ...state,
        loading: true
      };
    case LOGIN_DONE:
      return {
        ...state,
        loading: false,
        username: action.payload.username,
        access_token: action.payload.access_token,
        refresh_token: action.payload.refresh_token
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        login_fail: true,
        error_message: action.payload
      };
    default:
      return state;
  }
};
