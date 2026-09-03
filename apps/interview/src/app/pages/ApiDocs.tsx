import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 36px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: rgb(78, 86, 97);
  margin-bottom: 8px;
  font-size: 32px;
`;

const Version = styled.p`
  color: rgb(131, 138, 145);
  margin-bottom: 48px;
  font-size: 14px;
`;

const EndpointSection = styled.section`
  margin-bottom: 48px;
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const EndpointHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgb(239, 239, 239);
`;

const Method = styled.span<{ method: string }>`
  padding: 4px 12px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  background-color: ${({ method }) => {
    switch (method) {
      case 'GET':
        return '#e3f2fd';
      case 'POST':
        return '#e8f5e9';
      case 'DELETE':
        return '#ffebee';
      default:
        return '#f5f5f5';
    }
  }};
  color: ${({ method }) => {
    switch (method) {
      case 'GET':
        return '#1976d2';
      case 'POST':
        return '#388e3c';
      case 'DELETE':
        return '#d32f2f';
      default:
        return '#616161';
    }
  }};
`;

const Path = styled.code`
  font-size: 16px;
  color: rgb(78, 86, 97);
  font-weight: 500;
`;

const Summary = styled.p`
  color: rgb(78, 86, 97);
  margin-bottom: 24px;
  font-size: 16px;
`;

const Subsection = styled.div`
  margin-bottom: 24px;
`;

const SubsectionTitle = styled.h3`
  color: rgb(78, 86, 97);
  font-size: 18px;
  margin-bottom: 12px;
  font-weight: 600;
`;

const ParameterList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ParameterItem = styled.li`
  margin-bottom: 12px;
  padding: 12px;
  background: rgb(248, 248, 249);
  border-radius: 4px;
`;

const ParameterName = styled.code`
  color: rgb(78, 86, 97);
  font-weight: 600;
  margin-right: 8px;
`;

const ParameterType = styled.span`
  color: rgb(131, 138, 145);
  font-size: 14px;
`;

const ParameterDescription = styled.p`
  color: rgb(131, 138, 145);
  font-size: 14px;
  margin: 8px 0 0 0;
`;

const SchemaBox = styled.div`
  background: rgb(248, 248, 249);
  border-radius: 4px;
  padding: 16px;
  margin-top: 8px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 14px;
  overflow-x: auto;
`;

const SchemaTitle = styled.div`
  color: rgb(78, 86, 97);
  font-weight: 600;
  margin-bottom: 8px;
`;

const SchemaContent = styled.pre`
  margin: 0;
  color: rgb(78, 86, 97);
  white-space: pre-wrap;
  word-wrap: break-word;
`;

const ResponseCode = styled.div`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  background: #e8f5e9;
  color: #388e3c;
  font-weight: 600;
  font-size: 12px;
  margin-right: 8px;
`;

const ResponseDescription = styled.span`
  color: rgb(131, 138, 145);
  font-size: 14px;
`;

const ResponseItem = styled.div`
  margin-bottom: 12px;
`;

export const ApiDocs = () => (
  <Wrapper>
    <Title>Items API</Title>
    <Version>Version 1.0.0</Version>

    <EndpointSection>
      <EndpointHeader>
        <Method method="GET">GET</Method>
        <Path>/api/items</Path>
      </EndpointHeader>
      <Summary>Get list of items</Summary>

      <Subsection>
        <SubsectionTitle>Query Parameters</SubsectionTitle>
        <ParameterList>
          <ParameterItem>
            <div>
              <ParameterName>filter</ParameterName>
              <ParameterType>(object, optional)</ParameterType>
            </div>
            <ParameterDescription>
              Filter items by id, name, title, or description
            </ParameterDescription>
            <SchemaBox>
              <SchemaTitle>ItemFilter Schema:</SchemaTitle>
              <SchemaContent>{`{
  id?: number;
  name?: string;
  title?: string;
  description?: string;
}`}</SchemaContent>
            </SchemaBox>
          </ParameterItem>
          <ParameterItem>
            <div>
              <ParameterName>pagination</ParameterName>
              <ParameterType>(object, optional)</ParameterType>
            </div>
            <ParameterDescription>Pagination parameters</ParameterDescription>
            <SchemaBox>
              <SchemaTitle>PaginationRequest Schema:</SchemaTitle>
              <SchemaContent>{`{
  page?: number;  // Page number (0-indexed)
  per?: number;   // Items per page
}`}</SchemaContent>
            </SchemaBox>
          </ParameterItem>
        </ParameterList>
      </Subsection>

      <Subsection>
        <SubsectionTitle>Responses</SubsectionTitle>
        <ResponseItem>
          <ResponseCode>200</ResponseCode>
          <ResponseDescription>OK</ResponseDescription>
          <SchemaBox>
            <SchemaTitle>Response Schema:</SchemaTitle>
            <SchemaContent>{`{
  items: Array<{
    id: number;
    name: string;
    title?: string;
    description?: string;
  }>;
  pagination?: {
    page: number;
    per: number;
    total: number;
  };
}`}</SchemaContent>
          </SchemaBox>
        </ResponseItem>
      </Subsection>
    </EndpointSection>

    <EndpointSection>
      <EndpointHeader>
        <Method method="POST">POST</Method>
        <Path>/api/items</Path>
      </EndpointHeader>
      <Summary>Create item</Summary>

      <Subsection>
        <SubsectionTitle>Request Body</SubsectionTitle>
        <SchemaBox>
          <SchemaTitle>Item Schema:</SchemaTitle>
          <SchemaContent>{`{
  name: string;        // Required
  title?: string;      // Optional
  description?: string; // Optional
}`}</SchemaContent>
        </SchemaBox>
      </Subsection>

      <Subsection>
        <SubsectionTitle>Responses</SubsectionTitle>
        <ResponseItem>
          <ResponseCode>201</ResponseCode>
          <ResponseDescription>Item was created</ResponseDescription>
          <SchemaBox>
            <SchemaTitle>Response Schema:</SchemaTitle>
            <SchemaContent>{`{
  id: number;
  name: string;
  title?: string;
  description?: string;
}`}</SchemaContent>
          </SchemaBox>
        </ResponseItem>
        <ResponseItem>
          <ResponseCode>400</ResponseCode>
          <ResponseDescription>Bad request</ResponseDescription>
          <SchemaBox>
            <SchemaTitle>Error Schema:</SchemaTitle>
            <SchemaContent>{`{
  message: string;
  errors: Array<{
    path: string;
    message: string;
    errorCode: string;
  }>;
}`}</SchemaContent>
          </SchemaBox>
        </ResponseItem>
      </Subsection>
    </EndpointSection>

    <EndpointSection>
      <EndpointHeader>
        <Method method="DELETE">DELETE</Method>
        <Path>/api/items/{'{itemId}'}</Path>
      </EndpointHeader>
      <Summary>Delete item</Summary>

      <Subsection>
        <SubsectionTitle>Path Parameters</SubsectionTitle>
        <ParameterList>
          <ParameterItem>
            <div>
              <ParameterName>itemId</ParameterName>
              <ParameterType>(integer, required)</ParameterType>
            </div>
            <ParameterDescription>ID of item to delete</ParameterDescription>
          </ParameterItem>
        </ParameterList>
      </Subsection>

      <Subsection>
        <SubsectionTitle>Responses</SubsectionTitle>
        <ResponseItem>
          <ResponseCode>204</ResponseCode>
          <ResponseDescription>Item was deleted</ResponseDescription>
        </ResponseItem>
      </Subsection>
    </EndpointSection>
  </Wrapper>
);
