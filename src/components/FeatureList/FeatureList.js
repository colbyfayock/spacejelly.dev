import styles from './FeatureList.module.scss';

import Container from 'components/Container';
import Section from 'components/Section';

const FeatureList = ({ features = [] }) => {

  if ( !Array.isArray(features) ) {
    throw new Error(`Failed to render FeatureList: Invalid features type ${typeof features}`);
  }

  return (
    <Section className={styles.featureList} backgroundColor="primary">
      <Container>
        <h2>Features</h2>
        <ul>
          { features.map((feature, index) =>{
            return (
              <li key={index}>
                { feature }
              </li>
            )
          }) }
        </ul>
      </Container>
    </Section>
  )
}

export default FeatureList;