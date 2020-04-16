/*!
 * Copyright (c) 2018, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import Vue from 'vue'
import Router from 'vue-router'
//import 'semantic-ui-css/semantic.min.css'

import Auth from '@okta/okta-vue'

import HomeComponent from '@/components/Home'
import ProfileComponent from '@/components/Profile'
import MessagesComponent from '@/components/Messages'

Vue.use(Router)

//Vue.use(Auth, {
//  issuer: 'https://adobe-stage.okta.com/oauth2/aus1exw340qLpDruL1d8/v1/authorize',
//  client_id: '0oa1gnsv4utZguCOV1d8',
//  redirect_uri: 'http://localhost:8080/login',
//  response_type: 'code',
//  scope: 'openid+profile',
//  state: 'das',
//  pkce: true
//})

Vue.use(Auth, {
  issuer: 'https://kmcmh.okta.com/oauth2/default',
  clientId: '0oa95b4388N3mmjCs4x6',
  redirectUri: 'http://localhost:8080/implicit/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true
})


const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: HomeComponent
    },
    {
      path: '/implicit/callback',
      component: Auth.handleCallback()
    },
    {
      path: '/profile',
      component: ProfileComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/messages',
      component: MessagesComponent,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

export default router