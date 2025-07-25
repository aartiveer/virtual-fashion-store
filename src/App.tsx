import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store/store';
import {
  setItems,
  setKeyword,
  setSelectedPricing,
  resetFilters,
  applyFilters,
} from './store/contentSlice';
import styled from 'styled-components';
import { ContentItem, fetchContents } from './api/fetchContents';
import InfiniteScroll from 'react-infinite-scroll-component';
import { GlobalStyle } from './GlobalStyle';
import SearchIcon from '@mui/icons-material/Search';
import logo from './logo.png';

const Container = styled.div`
  max-width: 1200px;
  margin: 24px auto;
  padding: 0 20px;
`;

const Header = styled.header`
  background: #16171a;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  height: 64px;
`;

const RequiredBtn = styled.button`
  background: #29db95;
  color: #111;
  font-weight: 700;
  border: none;
  border-radius: 4px;
  margin-left: 8px;
  padding: 10px 18px;
  font-size: 1em;
`;

const Section = styled.section`
  margin-top: 30px;
`;

const SectionTitle = styled.div`
  font-size: 1.15em;
  color: #3ff7cf;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Bar = styled.div`
  background: #252327;
  border: 1px solid #3ff7cf;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 32px;
  flex-wrap: wrap;
`;

const Label = styled.label`
  font-size: 1em;
  color: grey;
`;

const ResetButton = styled.button`
  margin-left: auto;
  border: none;
  background: transparent;
  color: grey;
  font-weight: 600;
  letter-spacing: 2px;
  cursor: pointer;
  font-size: 0.8em;
`;

const GridWrapper = styled.div`
  border: 2.5px solid #3ff7cf;
  border-radius: 7px;
  background: #232427;
  padding: 10px;
  margin-top: 34px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
`;

const Card = styled.div`
  background: #232427;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const CardImageWrapper = styled.div`
  background: #232427;
  width: 100%;
  padding-top: 115%;
  position: relative;
`;

const CardImage = styled.img`
  position: absolute;
  object-fit: cover;
  top: 0; left: 0; right: 0; bottom: 0;
  width: 100%; height: 100%;
  border-radius: 4px 4px 0 0;
`;

const CardDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
`;

const CardText = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.div`
  font-weight: 600;
  color: #f9f9fa;
  font-size: 1.09em;
`;

const CardUser = styled.div`
  color: #c2c2cc;
  font-size: .96em;
`;

const CardPrice = styled.div<{ color: string }> `
  font-weight: bold;
  color: ${(props) => props.color};
  font-size: 1.15em;
`;

const SearchBarWrapper = styled.div`
  width: 100%;
  background: #232427;
  border-radius: 6px;
  margin-bottom: 28px;
  padding: 18px 32px;
  display: flex;
  align-items: center;
`;

const SearchTitle = styled.span`
  color: #3ff7cf;
  font-weight: 600;
  font-size: 1.13em;
  display: flex;
  align-items: center;
  margin-right: 22px;
`;

const SearchInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #f9f9fa;
  font-size: 1.06em;
  padding: 10px 14px 10px 0;
  margin-right: 14px;

  &::placeholder {
    color: grey;
    opacity: 1;
    font-size: 1em;
  }
`;

const App = () => {
  const dispatch = useDispatch();
  const { filteredItems, keyword, selectedPricing } = useSelector((state: RootState) => state.content);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchContents();
      dispatch(setItems(data));
    };
    loadData();
  }, [dispatch]);

  useEffect(() => {
    dispatch(applyFilters());
  }, [keyword, selectedPricing, dispatch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setKeyword(e.target.value));
  };

  const handlePricingChange = (option: number) => {
    const newSelected = selectedPricing.includes(option)
      ? selectedPricing.filter((o: number) => o !== option)
      : [...selectedPricing, option];
    dispatch(setSelectedPricing(newSelected));
  };

  return (
    <>
      <GlobalStyle />
      <Header>
        <img src={logo} alt="CONNECT Logo" style={{ height: '100px' }} />
        <RequiredBtn>REQUIRED FEATURE</RequiredBtn>
      </Header>
      <Container>
        <SearchBarWrapper>
          <SearchInput
            placeholder="Find the items you're looking for"
            value={keyword}
            onChange={handleSearch}
            aria-label="keyword search"
          />
          <SearchTitle>
            Keyword search
            <SearchIcon style={{ marginLeft: '6px', color: '#ffff' }} />
          </SearchTitle>
        </SearchBarWrapper>

        <Section>
          <SectionTitle>Contents Filter</SectionTitle>
          <Bar>
            Pricing options
            <Label>
              <input
                type="checkbox"
                checked={selectedPricing.includes(0)}
                onChange={() => handlePricingChange(0)}
                style={{ marginRight: 8 }}
              />
              Paid
            </Label>
            <Label>
              <input
                type="checkbox"
                checked={selectedPricing.includes(1)}
                onChange={() => handlePricingChange(1)}
                style={{ marginRight: 8 }}
              />
              Free
            </Label>
            <Label>
              <input
                type="checkbox"
                checked={selectedPricing.includes(2)}
                onChange={() => handlePricingChange(2)}
                style={{ marginRight: 8 }}
              />
              View Only
            </Label>
            <ResetButton onClick={() => dispatch(resetFilters())}>RESET</ResetButton>
          </Bar>
        </Section>

        <Section>
          <SectionTitle>Contents List</SectionTitle>
          <GridWrapper>
            <InfiniteScroll
              dataLength={filteredItems.length}
              next={() => {}}
              hasMore={false}
              loader={<h4>Loading...</h4>}
              style={{ overflow: 'visible' }}
            >
              <Grid>
                {filteredItems.map((item: ContentItem) => (
                  <Card key={item.id}>
                    <CardImageWrapper>
                      <CardImage
                        src={item.imagePath || 'https://via.placeholder.com/300x380/232427/eee?text=No+Image'}
                        alt={item.title}
                      />
                    </CardImageWrapper>
                    <CardDetails>
                      <CardText>
                        <CardTitle>{item.title}</CardTitle>
                        <CardUser>by {item.creator}</CardUser>
                      </CardText>
                      {item.pricingOption === 0 && (
                        <CardPrice color="#ffff">
                          ${item.price?.toFixed(2) ?? '—'}
                        </CardPrice>
                      )}
                      {item.pricingOption === 1 && (
                        <CardPrice color="#ffff">FREE</CardPrice>
                      )}
                      {item.pricingOption === 2 && (
                        <CardPrice color="#ffff">View Only</CardPrice>
                      )}
                    </CardDetails>
                  </Card>
                ))}
              </Grid>
            </InfiniteScroll>
          </GridWrapper>
        </Section>
      </Container>
    </>
  );
};

export default App;
