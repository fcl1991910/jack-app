import { LOGIN_ATEMPT, LOGIN_DONE, LOGIN_FAIL } from "../constants/actionTypes";

export default (
  state = {
    loading: false,
    login_fail: false,
    access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImJjNzU1ZjQzMWEwYjUyOWUzM2ZiNDU0NmE4NGM5NjdhYTk1YjNhNjNmMjY1MDVjODhiNGU0ZjM4ODU1MDM1ODUzMDkzMjlhY2IxODI5MWJjIn0.eyJhdWQiOiIyIiwianRpIjoiYmM3NTVmNDMxYTBiNTI5ZTMzZmI0NTQ2YTg0Yzk2N2FhOTViM2E2M2YyNjUwNWM4OGI0ZTRmMzg4NTUwMzU4NTMwOTMyOWFjYjE4MjkxYmMiLCJpYXQiOjE1MjE2NzgzODMsIm5iZiI6MTUyMTY3ODM4MywiZXhwIjoxNTIxNjgwMTgzLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.cx6Nc8x1mL2ceXp4z9Szrgv4MkspmmehJ-yq4kTspj8tR3WHFPclKZqMdZZz7XILm1CjiYzNkulYWq0JMhATsOFjsq8D4Gurve9GrnHXDgytQYshyN4vF72NotU-bzXQZF_TYyROs0GRocvw4cQ40DOnQJqkNOstU_u3n4aM8mCW_UAk8mVXTgMGf_Ucl6PRpFOjFTM2PmT4vz6zMJ8vxY7Ud9bLamQ-Z3O7fy9Io0JASWkFKz4iN6kN-Oq02C3XEzV2Vl9onM9GDrYfI4fPbfsVA6QA3bsq_u8sTVEnNg9ANiNkYmg8yrAsAJzW0Ira1Q8Yl1ocVNIhhdABMZh59iPKXHNJU4y5Ayao5JBC_t5KDpkYIY3kdHqyhVytLASXQ6prDmxlFD72fiJmn3L1tNw7zyR_3wFKFTtIZzrVYLaOquZXNG6fSOFPTPZNLGhE26W-9W-_vIBs-rlq-Vf6UsI0z0d55dq05OnhKnWslk1_ZuwcGJBo1Sq0-kNJo30rRCTjSahn929VgX4CXiGbujxKVZxJx13bVXUSyJyTU9ganGpzsq9TKlgZRRbt-bYe7qeRPWtBOwpWuwLOsjRJS8tHL8gjY61DBAwkKffx3eiahk1_vdHd6kt3gEjSl-2xW8XcoeZBHqfGHB3B00ABz964FHp1JsTyY5YPJh87wpM",
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
