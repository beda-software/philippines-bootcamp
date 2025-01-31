import { Button } from 'antd';

import logo from '@beda.software/emr/dist/images/logo.svg';
import { getAuthorizeUrl, OAuthState } from '@beda.software/emr/services';

import { S } from '@beda.software/emr/dist/containers/SignIn/SignIn.styles';
import { AppFooter } from '@beda.software/emr/dist/components/BaseLayout/Footer/index';

function authorize(state?: OAuthState) {
    window.location.href = getAuthorizeUrl(state);
}

interface SignInProps {
    originPathName?: string;
}

export function SignIn(props: SignInProps) {
    return (
        <S.Container>
            <S.Form>
                <div>
                    <S.Text>Welcome to</S.Text>
                    <img src={logo} alt="" />
                </div>
                <S.Message>
                  <p>
                  This Beda EMR instalation demonstarted integration with Aidbox forms.
                  </p>
                  <p>
                  Source code of this application and documentation you can find here:
                  </p>
                  <a href="https://github.com/beda-software/philippines-bootcamp" target="_blank">
                  https://github.com/beda-software/philippines-bootcamp
                  </a>
               </S.Message>
                <Button
                    type="primary"
                    onClick={() => authorize({ nextUrl: props.originPathName })}
                    size="large"
                >
                    Log in
                </Button>
            </S.Form>
            <AppFooter type="light" />
        </S.Container>
    );
}
