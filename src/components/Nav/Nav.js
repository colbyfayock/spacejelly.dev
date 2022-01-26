import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { FaSearch, FaDiscord } from 'react-icons/fa';

import useSite from 'hooks/use-site';
import useSearch from 'hooks/use-search';
import { postPathBySlug } from 'lib/posts';
import { pagePathBySlug } from 'lib/pages';
import { getRouteByName } from 'lib/routes';

import Section from 'components/Section';
import Input from 'components/Input';
import SpaceJelly from 'components/SpaceJelly';
import CosmoWave from 'components/CosmoWave';

import styles from './Nav.module.scss';

const Nav = () => {
  const formRef = useRef();

  const { metadata = {} } = useSite();
  const { title } = metadata;

  const { query, results, search, clearSearch } = useSearch({
    maxResults: 5,
  });

  const hasResults = results.length > 0;

  // When we have results, we want to add an event listener that allows us to
  // detect when someone clicks outside of the search box, allowing us to close the results
  // when focus is drawn away from search

  useEffect(() => {
    addDocumentOnClick();
    addResultsRoving();
    return () => {
      removeResultsRoving();
      removeDocumentOnClick();
    };
  }, [hasResults]);

  useEffect(() => {
    document.addEventListener('mousemove', (event) => {
      const eyes = document.querySelectorAll(`.${styles.squidRobotEye}`);
      Array.from(eyes).forEach((eye) => {
        const dimensions = eye.getBoundingClientRect();
        const x = dimensions.left + dimensions.width / 2;
        const y = dimensions.top + dimensions.height / 2;
        const rad = Math.atan2(event.pageX - x, event.pageY - y);
        const rot = rad * (180 / Math.PI) * -1 + 90;
        eye.style.transform = `rotate(${rot}deg)`;
      });
    });
  }, []);

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
    const { nodeName, nextSibling, parentElement } = focusElement || {};

    if (!hasResults) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (nodeName === 'INPUT' && nextSibling?.children[0].nodeName !== 'P') {
        nextSibling.children[0].firstChild.firstChild.focus();
      } else if (parentElement.nextSibling) {
        parentElement.nextSibling.firstChild.focus();
      } else {
        parentElement.parentElement.firstChild.firstChild.focus();
      }
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (nodeName === 'A' && parentElement.previousSibling) {
        parentElement.previousSibling.firstChild.focus();
      } else {
        parentElement.parentElement.lastChild.firstChild.focus();
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
          <Link href={getRouteByName('home')?.path}>
            <a>
              <SpaceJelly />
            </a>
          </Link>
        </p>
        <p className={styles.navDiscord}>
          <a href="https://spacejelly.dev/discord" target="_blank" rel="noopener">
            <FaDiscord />
            <strong>Join the Discord</strong>
            <span>spacejelly.dev</span>
          </a>
        </p>
        <div className={styles.navCosmo}>
          <Link href={getRouteByName('about')?.path}>
            <a>
              <CosmoWave />
            </a>
          </Link>
        </div>
      </Section>

      <Section className={styles.navSection}>
        <div className={styles.navBar}>
          <div className={styles.navBarSection}>
            <ul className={styles.navBarLinks}>
              <li>
                <Link href={getRouteByName('home')?.path}>
                  <a>Articles</a>
                </Link>
              </li>
              <li>
                <a className="link-external" href="https://www.youtube.com/colbyfayock" target="_blank" rel="noopener">
                  Videos
                </a>
              </li>
            </ul>
          </div>
          <div className={styles.navBarSection} data-navbar-breakpoint="min-1024">
            <ul className={styles.navBarLinks}>
              <li>
                <Link href={getRouteByName('categoryNextjs')?.path}>
                  <a>Next.js</a>
                </Link>
              </li>
              <li>
                <Link href={getRouteByName('categoryMedia')?.path}>
                  <a>Images & Video</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.navBarSection} data-navbar-section-grow="true">
            <form className={styles.navSearch} ref={formRef} action="/search" data-search-is-active={!!query}>
              <label className="sr-only" htmlFor="search-query">
                Search Query
              </label>
              <Input
                id="search-query"
                type="search"
                name="q"
                value={query || ''}
                onChange={handleOnSearch}
                autoComplete="off"
                aria-label="Enter your search query"
                placeholder="Search..."
                required
              />
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
            </form>
          </div>
          <div className={styles.navBarSection}>
            <ul className={styles.navBarLinks}>
              <li>
                <Link href={getRouteByName('courses')?.path}>
                  <a>Courses</a>
                </Link>
              </li>
              <li>
                <Link href={getRouteByName('books')?.path}>
                  <a>Books</a>
                </Link>
              </li>
              <li>
                <Link href={getRouteByName('store')?.path}>
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
