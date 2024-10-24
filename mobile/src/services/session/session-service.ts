import * as HttpService from '@src/services/http-service';
import { SessionDetails } from '@src/types/api/session';
import { CREATE_USER_SESSION } from './session-url';



export const createUserSession = (sessionDetails:SessionDetails) => HttpService.post(CREATE_USER_SESSION(),sessionDetails);


