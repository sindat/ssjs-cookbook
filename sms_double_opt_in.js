// source: https://code4.cloud/articles/sfmc-subscribe-mobile-numbers-to-keyword-with-mobileconnect-rest-api/

/* replace the highlighted values with yours */
<script runat="server">
   Platform.Load("Core", "1");
   try {

         /* get OAuth 2.0 access token */
          var payload = '{"grant_type":"client_credentials",';
                payload += '"client_id":"d20aaul96htb2hgo9b4i47gx",';
                payload += '"client_secret":"tUriuDS0zdV82vFrLIbJek77",';
                payload += '"scope":null,';
                payload += '"account_id":"012345678"}';
          var OAuth2URL = "https://mc06n741d3km57h-ztlmx29hh3s7.auth.marketingcloudapis.com/v2/token";
          var contentType = 'application/json';
          var accessTokenResult = HTTP.Post(OAuth2URL, contentType, payload);
          var tokenObj = Platform.Function.ParseJSON(accessTokenResult["Response"][0]);
          var accessToken = tokenObj.access_token;
          var headerNames = ["Authorization"];
          var headerValues = ["Bearer " + accessToken];

          /* build an array of mobile numbers from the data extension 
           data extension external key is MobileNumbersToSubscribe 
           the field that stores mobile numbers is named Mobile */
          var sc = DataExtension.Init("MobileNumbersToSubscribe");
          var data = sc.Rows.Retrieve();
          var mobileNumbers = [];
          if(data.length) {
             for(i=0; i<data.length; i++) {
                  mobileNumbers[i] = data[i].Mobile;
             }
          }

          /* create the payload */ 
          var mobilePayload = '{"mobileNumbers": ' + Stringify(mobileNumbers) + ',';
          mobilePayload += '"shortCode": "67890",';
          mobilePayload += '"messageText": "KEYWORD"}';

          /* make the API call and get the response */ 
          var content = [0];
          var urlPost = "https://mc06n741d3km57h-ztlmx29hh3s7.rest.marketingcloudapis.com/sms/v1/queueMO";
          var response = HTTP.Post(urlPost, contentType, mobilePayload, headerNames, headerValues, content);
          Write(Stringify(response));

    } catch(e) { Write(Stringify(e)); }
</script>