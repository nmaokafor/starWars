import { FunctionComponent } from 'react';
import styles from './SuggestionsList.module.scss';

interface Props {
  filteredSuggestions: Array<any>;
  activeSuggestionIndex: number;
  handleMouseDown: any;
}

export const SuggestionsList: FunctionComponent<Props> = ({
  filteredSuggestions,
  activeSuggestionIndex,
  handleMouseDown,
}) => {
  return filteredSuggestions.length ? (
    <ul className={styles.suggestions}>
      {filteredSuggestions.map((suggestion: string, index: number) => {
        let className;
        if (index === activeSuggestionIndex) {
          className = 'suggestion-active';
        }
        return (
          <li
            className={className}
            key={`${suggestion}-${index}`}
            onMouseDown={handleMouseDown}
          >
            {suggestion}
          </li>
        );
      })}
    </ul>
  ) : (
    <div className={styles.noSuggestions}>
      <em>No suggestions found</em>
    </div>
  );
};

export default SuggestionsList;
