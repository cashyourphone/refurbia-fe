import Legal from '@/components/legal';
import { FC, Suspense } from 'react';

const Home: FC = () => {
    return (
        <div className='p-5 flex justify-center items-center'>
            <Suspense>
                <Legal />
            </Suspense>
        </div>
    );
};

export default Home;