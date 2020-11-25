import React, { useState } from 'react';
import { SketchPicker, ColorResult } from 'react-color';
import { useTranslation } from 'react-i18next';

import { IColorPickerProps } from './ColorPicker.d';

import './ColorPicker.scss';

const ColorPicker = (props: IColorPickerProps) => {
  const [hexCode, setCode] = useState(props.value || '');
  const [isShow, setShow] = useState(false);
  const { t } = useTranslation();

  const handleChange = (color: ColorResult) => {
    setCode(color.hex);
    props.onSelect(props.name, color.hex);
  };

  const handleClick = () => {
    if (props.readonly) return;
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div className="w-100 d-flex mt-2 color-picker">
      <div className="d-flex">
        <span className="preview-color" style={{ backgroundColor: hexCode }} />
        {hexCode}
      </div>
      <div className="ml-auto">
        <span className="pick-button" onClick={handleClick}>
          {t('PICK')}
        </span>
        {isShow && (
          <>
            <div className="cover-outside" onClick={handleClose} />
            <div className="position-absolute picker-overlay mr-1">
              <SketchPicker onChange={handleChange} color={hexCode} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ColorPicker;
