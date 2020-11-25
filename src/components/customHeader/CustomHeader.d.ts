import { Component, ComponentElement } from 'react';

export interface NavProps {
  title: string;
  to?: string;
  dropdown?: ComponentElement;
}
export interface HeaderProps {
  color?: string;
}
