import React, { useState, useEffect } from 'react';
import { Prompt, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Location } from 'history';

import WarningMessage from '../../components/modal/WarningMessage/WarningMessage';

import { hasOnlyMode, hasModes } from 'utils/permissions';
import { PERMISSION_PREFIX } from 'constants/enum';
import useAuthentication from 'stores/AuthenticationStore/authentication';
import { IProps } from './routeLeavingGuard.d';

export const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  event.preventDefault();
  event.returnValue = '';
};

const removeBeforeUnload = () => {
  window.removeEventListener('beforeunload', handleBeforeUnload);
};

const RouteLeavingGuard: React.FC<IProps> = (props) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [showModal, setShow] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [lastLocation, setLastLocation] = useState<Location | null>(null);

  const [state] = useAuthentication();

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);

    return removeBeforeUnload();
  }, []);

  const checkPermissionHasOnlyView = (permissions: string[]) => {
    const viewMode = permissions.filter((item) => {
      return item.includes(props.mode || '');
    });

    return (
      hasOnlyMode(viewMode, `${PERMISSION_PREFIX.VIEW}_${props.mode}`) ||
      (!hasModes(viewMode, [`${PERMISSION_PREFIX.EDIT}_${props.mode}`]) &&
        !hasModes(viewMode, [`${PERMISSION_PREFIX.CREATE}_${props.mode}`]) &&
        !hasModes(viewMode, [`${PERMISSION_PREFIX.ACTIVATE}_${props.mode}`]) &&
        !hasModes(viewMode, [`${PERMISSION_PREFIX.DEACTIVATE}_${props.mode}`]))
    );
  };

  const shouldNotShowPopup = checkPermissionHasOnlyView(state.user.permissions);

  useEffect(() => {
    if (lastLocation && confirmed) {
      history.push(lastLocation.pathname, lastLocation.state);
    }
  }, [lastLocation, confirmed, history]);

  const handleBlockedNavigation = (nextLocation: Location) => {
    if (!props.when) {
      return false;
    }
    if (!confirmed && !shouldNotShowPopup) {
      setShow(true);
      setLastLocation(nextLocation);
      return false;
    }
    return true;
  };
  const handleCancel = () => {
    setShow(false);
  };

  const handleOk = () => {
    setShow(false);
    setConfirmed(true);
  };

  return (
    <>
      <Prompt when={props.when} message={handleBlockedNavigation} />
      <WarningMessage
        isOpen={showModal}
        message={t('LOST_DATA')}
        textCancel={t('CANCEL')}
        textOk={t('OK')}
        title={t('WARNING')}
        onOkHandler={handleOk}
        onCancelHandler={handleCancel}
      />
    </>
  );
};

export default RouteLeavingGuard;
