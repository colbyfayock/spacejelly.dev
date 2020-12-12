import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { FaSearch, FaDiscord } from 'react-icons/fa';

import useSite from 'hooks/use-site';
import useSearch from 'hooks/use-search';
import { postPathBySlug } from 'lib/posts';
import { pagePathBySlug } from 'lib/pages';

import Section from 'components/Section';
import Input from 'components/Input';
import SpaceJelly from 'components/SpaceJelly';
import CosmoWave from 'components/CosmoWave';

import styles from './Nav.module.scss';

const SEARCH_VISIBLE = 'visible';
const SEARCH_HIDDEN = 'hidden';

const Nav = () => {
  const formRef = useRef();

  const [searchVisibility, setSearchVisibility] = useState(SEARCH_HIDDEN);
  const searchIsVisible = searchVisibility === SEARCH_VISIBLE;

  const { metadata = {} } = useSite();
  const { title } = metadata;

  const { query, results, search, clearSearch } = useSearch({
    maxResults: 5,
  });

  // When the search visibility changes, we want to add an event listener that allows us to
  // detect when someone clicks outside of the search box, allowing us to close the results
  // when focus is drawn away from search

  useEffect(() => {
    // If we don't have a query, don't need to bother adding an event listener
    // but run the cleanup in case the previous state instance exists

    if (searchVisibility === SEARCH_HIDDEN) {
      removeDocumentOnClick();
      return;
    }

    addDocumentOnClick();
    addResultsRoving();

    // When the search box opens up, additionall find the search input and focus
    // on the element so someone can start typing right away

    const searchInput = Array.from(formRef.current.elements).find((input) => input.type === 'search');

    searchInput.focus();

    return () => {
      removeResultsRoving();
      removeDocumentOnClick();
    };
  }, [searchVisibility]);

  /**
   * addDocumentOnClick
   */

  function addDocumentOnClick() {
    document.body.addEventListener('click', handleOnDocumentClick, true);
  }

  /**
   * removeDocumentOnClick
   */

  function removeDocumentOnClick() {
    document.body.removeEventListener('click', handleOnDocumentClick, true);
  }

  /**
   * handleOnDocumentClick
   */

  function handleOnDocumentClick(e) {
    if (!e.composedPath().includes(formRef.current)) {
      setSearchVisibility(SEARCH_HIDDEN);
      clearSearch();
    }
  }

  /**
   * handleOnSearch
   */

  function handleOnSearch({ currentTarget }) {
    search({
      query: currentTarget.value,
    });
  }

  /**
   * handleOnToggleSearch
   */

  function handleOnToggleSearch() {
    setSearchVisibility(SEARCH_VISIBLE);
  }

  /**
   * addResultsRoving
   */

  function addResultsRoving() {
    document.body.addEventListener('keydown', handleResultsRoving);
  }

  /**
   * removeResultsRoving
   */

  function removeResultsRoving() {
    document.body.removeEventListener('keydown', handleResultsRoving);
  }

  /**
   * handleResultsRoving
   */

  function handleResultsRoving(e) {
    const focusElement = document.activeElement;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (focusElement.nodeName === 'INPUT' && focusElement.nextSibling.children[0].nodeName !== 'P') {
        focusElement.nextSibling.children[0].firstChild.firstChild.focus();
      } else if (focusElement.parentElement.nextSibling) {
        focusElement.parentElement.nextSibling.firstChild.focus();
      } else {
        focusElement.parentElement.parentElement.firstChild.firstChild.focus();
      }
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (focusElement.nodeName === 'A' && focusElement.parentElement.previousSibling) {
        focusElement.parentElement.previousSibling.firstChild.focus();
      } else {
        focusElement.parentElement.parentElement.lastChild.firstChild.focus();
      }
    }
  }

  /**
   * escFunction
   */

  // pressing esc while search is focused will close it

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      clearSearch();
      setSearchVisibility(SEARCH_HIDDEN);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, []);

  return (
    <nav className={styles.nav}>
      <Section className={`${styles.navSection} ${styles.navMasthead}`}>
        <p className={styles.navName}>
          <Link href="/">
            <a><SpaceJelly /></a>
          </Link>
        </p>
        <p className={styles.navDiscord}>
          <a href="https://spacejelly.dev/discord">
            <FaDiscord />
            <strong>Join the Discord</strong>
            <span>spacejelly.dev</span>
          </a>
        </p>
        <div className={styles.navCosmo}>
          <CosmoWave />
        </div>
      </Section>

      <Section className={styles.navSection}>
        <div className={styles.navBar}>
          <div className={styles.navBarSection}>
            <ul className={styles.navBarLinks}>
              <li>
                <Link href="#">
                  <a>Articles</a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a>Videos</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.navBarSection}>
            <ul className={styles.navBarLinks}>
              <li>
                <Link href="#">
                  <a>Web Dev</a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a>Next.js</a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a>React</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.navBarSection} data-navbar-section-grow="true">
            <form className={styles.navSearch} ref={formRef} action="/search" data-search-is-active={!!query}>
              <Input
                type="search"
                name="q"
                value={query || ''}
                onChange={handleOnSearch}
                autoComplete="off"
                placeholder="Search..."
                required
              />
              {searchIsVisible && (
                <>
                  <div className={styles.navSearchResults}>
                    {results.length > 0 && (
                      <ul>
                        {results.map(({ slug, title }, index) => {
                          return (
                            <li key={slug}>
                              <Link tabIndex={index} href={postPathBySlug(slug)}>
                                <a>{title}</a>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                    {results.length === 0 && (
                      <p>
                        Sorry, not finding anything for <strong>{query}</strong>
                      </p>
                    )}
                  </div>
                </>
              )}
            </form>
          </div>
          <div className={styles.navBarSection}>
            <ul className={styles.navBarLinks}>
              <li>
                <Link href="#">
                  <a>Books</a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a>Store</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Section>

    </nav>
  );
};

export default Nav;
